import {
  call, CallEffect, put, PutEffect, SagaReturnType, select, SelectEffect, takeLatest,
} from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import * as api from '@api';
import { httpUtils } from '@services';
import { DTOWebSocketsVOD, EWebSocketEventTypes } from '@services/webSockets';
import {
  DTOVod,
  IGetFeedVideos,
  IGetNewFeedVideos,
  EFeedContentType,
  DTOVodAndPost, DTOPosts,
} from '@api/types';
import { selectTeamId } from '@store/teams/selectors';
import { actions as postsActions } from '@store/posts/slice';
import { actions } from './slice';
import { updatePublishedDateOfLastFetchedItem } from './utils';

const { extractErrorMessage } = httpUtils;

const webSocketEventTypesForUpdate = [
  EWebSocketEventTypes.vodUpdated,
  EWebSocketEventTypes.vodCreated,
  EWebSocketEventTypes.videoUpdated,
];

function* fetchFeedVideosWorker({ payload }: { payload: number, type: string }): Generator<SelectEffect
  | CallEffect<AxiosResponse<Array<DTOVod>>>
  | PutEffect<{ payload: { videos: DTOVod[] }, type: string }>
  | PutEffect<{ payload: string, type: string }>> {
  try {
    const countLoadedVideo = payload;
    const teamId = yield select(selectTeamId);
    const res = yield call(api.getFeedVideos, {
      count: countLoadedVideo,
      limit: 10,
      teamId,
    } as IGetFeedVideos);

    const typedRes = res as SagaReturnType<typeof api.getFeedVideos>;
    const videos = <DTOVod[]>typedRes.data;
    yield put(actions.fetchFeedVideosSuccess(
      {
        videos,
      },
    ));
    updatePublishedDateOfLastFetchedItem(videos);
  } catch (e) {
    const error = e as Error;
    yield put(actions.fetchFeedVideosError(error?.message));
  }
}

function* fetchNewFeedItemsWorker({ payload }: { payload: IGetNewFeedVideos, type: string }): Generator {
  try {
    const res = yield call(api.getNewVODs, payload);
    const typedRes = res as SagaReturnType<typeof api.getNewVODs>;
    const data = <DTOVodAndPost[]>typedRes.data;
    const videos = data.filter((item) => item.type !== EFeedContentType.POST);
    const posts = data.filter((item) => item.type === EFeedContentType.POST);

    if (videos?.length) {
      yield put(actions.fetchNewFeedVideosSuccess(videos as DTOVod[]));
    }
    if (posts?.length) yield put(postsActions.fetchNewFeedPostsSuccess(posts as DTOPosts[]));
    updatePublishedDateOfLastFetchedItem(data as DTOVodAndPost[]);
  } catch (e) {
    const error = e as AxiosError;
    yield put(actions.fetchNewFeedVideosError(extractErrorMessage(error)));
  }
}

function* updateFeedWorker({ payload }: { payload: DTOWebSocketsVOD, type: string }): Generator {
  try {
    const {
      type,
      data,
    } = payload;
    if (webSocketEventTypesForUpdate.includes(type)) {
      updatePublishedDateOfLastFetchedItem([data]);
    }
    yield put(actions.updateFeedSuccess(payload));
  } catch (e) {
    const error = e as Error;
    yield put(actions.updateFeedError(error?.message));
  }
}

export function* saga(): Generator {
  yield takeLatest(actions.fetchFeedVideosInit.type, fetchFeedVideosWorker);
  yield takeLatest(actions.updateFeedInit.type, updateFeedWorker);
  yield takeLatest(actions.fetchNewFeedVideosInit.type, fetchNewFeedItemsWorker);
}
