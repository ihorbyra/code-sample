import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import differenceBy from 'lodash/differenceBy';

import { DTOLiveStream } from '@api/types';
import { matchRoutePath, routes } from '@routes';
import {
  DTOWebSocketsLiveStream,
  EWebSocketEventTypes,
} from '@services/webSockets';
import { getTitleColors } from '@utils';
import { updateLives } from './utils';

export interface ITitleColors {
  [key: number]: {
    titleColor: string;
    titleBackground: string
  };
}

export type LivesState = {
  loading: boolean,
  showSkeleton: boolean,
  error: string,
  data: {
    lives: DTOLiveStream[],
  }
  removedIds: number[]
  titleColors: ITitleColors
}

const initialState: LivesState = {
  loading: false,
  showSkeleton: true,
  error: '',
  data: {
    lives: [],
  },
  removedIds: [],
  titleColors: {},
};

const livesSlice = createSlice({
  name: 'lives',
  initialState,
  reducers: {
    fetchLivesInit(state) {
      state.loading = true;
    },
    fetchLivesSuccess(state, action: PayloadAction<Array<DTOLiveStream>>) {
      state.loading = false;
      state.showSkeleton = false;

      if (state.data.lives.length) {
        const differentOldLives = differenceBy(state.data.lives, action.payload, 'id');
        const differentNewLives = differenceBy(action.payload, state.data.lives, 'id');

        differentOldLives.forEach(({ id }) => {
          state.removedIds.push(id);
        });

        state.data.lives.push(...differentNewLives);
      } else {
        state.data.lives = action.payload;
      }

      action.payload.forEach(({ id }) => {
        if (!Object.keys(state.titleColors)
          .includes(String(id))) {
          state.titleColors[id] = getTitleColors();
        }
      });
    },
    fetchLivesError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.showSkeleton = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateLivesInit(state, action: PayloadAction<DTOWebSocketsLiveStream>) {
      state.loading = initialState.loading;
    },
    updateLivesSuccess(state, action: PayloadAction<DTOWebSocketsLiveStream>) {
      const {
        data,
        type,
      } = action.payload;

      switch (type) {
        case EWebSocketEventTypes.liveStreamStarted: {
          state.data.lives = updateLives(state.data.lives, data as DTOLiveStream);
          state.titleColors[data.id] = getTitleColors();
          break;
        }
        case EWebSocketEventTypes.liveStreamUpdated: {
          state.data.lives = updateLives(state.data.lives, data as DTOLiveStream);
          break;
        }
        case EWebSocketEventTypes.liveStreamFinished: {
          const matchPath = matchRoutePath(routes.HOME);
          if (matchPath) {
            state.removedIds.push(data.id);
          } else {
            state.data.lives = state.data.lives.filter(({ id }) => id !== data.id);
          }
          break;
        }
        default:
          break;
      }
    },
    updateLivesError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    getLiveById(state, action: PayloadAction<DTOLiveStream>) {
      const newLive = action.payload;
      const currentLiveExist = state.data.lives.find(({ id }) => id === newLive.id);
      if (!currentLiveExist) state.data.lives.push(newLive);
    },
    removeLiveById(state, action: PayloadAction<number>) {
      state.data.lives = state.data.lives.filter(({ id }) => id !== action.payload);
    },
    removeItemOnAnimationDone(state, action: PayloadAction<number>) {
      state.removedIds = state.removedIds.filter((id) => id !== action.payload);
      state.data.lives = state.data.lives.filter(({ id }) => id !== action.payload);
    },
  },
});

export const {
  actions,
  reducer,
} = livesSlice;
