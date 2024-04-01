import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
  RetryContext,
} from '@microsoft/signalr';
import isNil from 'lodash/isNil';
import { backOff, IBackOffOptions } from 'exponential-backoff';

import { config } from '@config';
import { actions, selectors } from '@store';
import { getCorrectTokenForRequests } from '@services/http/utils';
import {
  env, getStorageItem, useOnline, useTokenUpdate, useRecursiveTimeout,
} from '@utils';
import { DTOLiveStream } from '@api/feed/types';
import {
  DTOWebSocketsLiveStream,
  DTOWebSocketsVOD,
  DTOWebSocketsPosts,
  EWebSocketEventTypes,
  EWebSocketTargets,
} from './types';

const timeoutError = 'Server timeout elapsed without receiving a message from the server.';

const {
  webSockets: { url: webSocketsApiUrl },
  features: { feed: feedConf },
} = config;

const serverTimeout = 30;

const logConfig = config.env === 'production' ? LogLevel.None : LogLevel.Information;

const isWsConnected = (
  hubConnection: HubConnection | undefined,
): boolean => !isNil(hubConnection) && hubConnection?.state === HubConnectionState.Connected;

const isWsDisconnected = (
  hubConnection: HubConnection | undefined,
): boolean => isNil(hubConnection) || hubConnection?.state === HubConnectionState.Disconnected;

const WebSockets = (): null => {
  const dispatch = useDispatch();
  const teamId = useSelector(selectors.teams.selectTeamId);
  const [wsConnection, setWsConnection] = useState<HubConnection>();
  const [reconnecting, setReconnecting] = useState(false);
  const [startPolling, setStartPolling] = useState(true);
  const [isOnline, backOnline] = useOnline();

  const tokenWasUpdated = useTokenUpdate('token', 'idToken');

  const nextRetryDelayInMilliseconds = (retryContext: RetryContext): number | null => {
    const delays = [0, 1000, 5000, 15000, 30000, 60000];
    const {
      elapsedMilliseconds,
      previousRetryCount,
      retryReason,
    } = retryContext;

    setReconnecting(true);

    if (elapsedMilliseconds >= 1000) setStartPolling(true);

    if (retryReason && retryReason.message.toLowerCase() !== timeoutError.toLowerCase()) {
      dispatch(actions.auth.refreshTokenInit());
    }

    if (elapsedMilliseconds <= 60000) {
      return delays[previousRetryCount];
    }
    return null;
  };

  const joinGroups = async (): Promise<any> => {
    try {
      await backOff<IBackOffOptions>((): any => {
        if (wsConnection?.state === HubConnectionState.Connected) {
          if (env.isDev()) {
            // eslint-disable-next-line no-console
            console.log('...Trying to join groups', wsConnection?.state);
          }
          const clientId = getStorageItem('anonymousAppClientId');
          wsConnection.invoke('SubscribeToRightNow', clientId);
          wsConnection.invoke('SubscribeToLatestVideos', clientId);
          wsConnection.invoke('SubscribeToLatestPosts', clientId);
        } else {
          throw new Error(`connection state is ${wsConnection?.state}`);
        }
      }, {
        delayFirstAttempt: true,
        numOfAttempts: 5,
      });
    } catch (e) {
      if (env.isDev()) {
        const error = e as Error;
        // eslint-disable-next-line no-console
        console.log('> Error: [Joining ws groups]:', error.message);
      }
    }
  };

  const newLiveStream = (data: DTOLiveStream, type: EWebSocketEventTypes): void => {
    dispatch(actions.lives.updateLivesInit({
      data,
      type,
    }));
  };

  const updatedLiveStream = (data: DTOLiveStream, type: EWebSocketEventTypes): void => {
    dispatch(actions.lives.updateLivesInit({
      data,
      type,
    }));
    dispatch(actions.video.updateSingleLive(data));
  };

  const finishedLiveStream = (data: DTOLiveStream, type: EWebSocketEventTypes): void => {
    dispatch(actions.lives.updateLivesInit({
      data,
      type,
    }));
  };

  const runLiveStreamActions = ({
    type,
    data,
    // eslint-disable-next-line consistent-return
  }: DTOWebSocketsLiveStream): void => {
    switch (type) {
      case EWebSocketEventTypes.liveStreamStarted:
        return newLiveStream(data, type);
      case EWebSocketEventTypes.liveStreamUpdated:
        return updatedLiveStream(data, type);
      case EWebSocketEventTypes.liveStreamFinished:
        return finishedLiveStream(data, type);
      default:
        break;
    }
  };

  const runVODActions = ({
    type,
    data,
    // eslint-disable-next-line consistent-return
  }: DTOWebSocketsVOD): void => {
    dispatch(actions.videos.updateFeedInit({
      data,
      type,
    }));
  };

  const runPostsActions = ({
    type,
    data,
    // eslint-disable-next-line consistent-return
  }: DTOWebSocketsPosts): void => {
    dispatch(actions.posts.updatePostsInit({
      data,
      type,
    }));
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${webSocketsApiUrl}`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: getCorrectTokenForRequests,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds,
      })
      .configureLogging(logConfig)
      .build();

    newConnection.serverTimeoutInMilliseconds = serverTimeout * 1000;

    setWsConnection(newConnection);
  }, []);

  useEffect(() => {
    if (reconnecting) {
      joinGroups();
    }
    setReconnecting(false);
  }, [reconnecting]);

  useEffect(() => {
    if (!isNil(wsConnection) && wsConnection?.state === HubConnectionState.Disconnected) {
      wsConnection
        .start()
        .then(() => {
          const clientId = getStorageItem('anonymousAppClientId');
          wsConnection.invoke('SubscribeToRightNow', clientId);
          wsConnection.invoke('SubscribeToLatestVideos', clientId);
          wsConnection.invoke('SubscribeToLatestPosts', clientId);

          wsConnection.on(EWebSocketTargets.HandleRightNowEvent, (data: DTOWebSocketsLiveStream) => {
            if (!isOnline || isWsDisconnected(wsConnection)) {
              return;
            }
            runLiveStreamActions(data);
          });

          wsConnection.on(EWebSocketTargets.HandleLatestVideosEvent, (data: DTOWebSocketsVOD) => {
            if (!isOnline || isWsDisconnected(wsConnection)) {
              return;
            }
            runVODActions(data);
          });

          wsConnection.on(EWebSocketTargets.HandleLatestPostsEvent, (data: DTOWebSocketsPosts) => {
            if (!isOnline || isWsDisconnected(wsConnection)) {
              return;
            }
            runPostsActions(data);
          });
        })
        // eslint-disable-next-line no-console
        .catch((error) => {
          if (env.isDev()) console.log('>', error.message);
        });
    }
  }, [wsConnection, tokenWasUpdated, backOnline]);

  useRecursiveTimeout(() => {
    if (isWsConnected(wsConnection) && startPolling) {
      setStartPolling(false);
      return;
    }

    if (isOnline && (startPolling || isWsDisconnected(wsConnection))) {
      if (env.isDev()) console.log('> Polling: fetching lives');
      dispatch(actions.lives.fetchLivesInit());
    }
  }, feedConf.timeToUpdatingLives);

  useRecursiveTimeout(() => {
    if (isOnline && (startPolling || isWsDisconnected(wsConnection))) {
      const lastViewDate = getStorageItem<string>('publishedDateOfLastFetchedVideo');
      dispatch(actions.videos.fetchNewFeedVideosInit({
        diff: true,
        lastViewDate,
        teamId,
      }));
    }
  }, feedConf.timeToUpdatingVODs);

  return null;
};

export default WebSockets;
