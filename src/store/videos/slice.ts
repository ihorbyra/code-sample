import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DTOVod, IGetNewFeedVideos } from '@api/types';
import { getTitleColors } from '@utils';
import { DTOWebSocketsVOD, EWebSocketEventTypes } from '@services/webSockets';
import { updateFeed } from './utils';

export interface ITitleColors {
  [key: number]: {
    titleColor: string;
    titleBackground: string
  };
}

export interface PostsState {
  loading: boolean;
  isMoreLoading: boolean;
  canLoadMore: boolean;
  error: string;
  titleColors: ITitleColors;
  showLoadMore: boolean;
  showSkeleton: boolean;
  videos: DTOVod[];
}

interface IFetchFeedVideosSuccessPayload {
  videos: DTOVod[];
}

const initialState: PostsState = {
  loading: false,
  isMoreLoading: false,
  canLoadMore: true,
  error: '',
  titleColors: {},
  showLoadMore: true,
  showSkeleton: true,
  videos: [],
};

const slice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchFeedVideosInit(state, action: PayloadAction<number>) {
      if (state.videos.length) {
        state.isMoreLoading = true;
      } else {
        state.loading = true;
      }
    },
    fetchFeedVideosSuccess(state, action: PayloadAction<IFetchFeedVideosSuccessPayload>) {
      const { videos } = action.payload;
      if (!videos.length || videos.length < 10) {
        state.canLoadMore = false;
      }
      if (!state.videos.length && (!videos.length || videos.length < 10)) {
        state.showLoadMore = false;
      }
      state.loading = false;
      state.isMoreLoading = false;
      state.showSkeleton = false;
      state.videos.push(...videos);

      videos.forEach(({ id }) => {
        state.titleColors[id] = getTitleColors();
      });
    },
    fetchFeedVideosError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isMoreLoading = false;
      state.showSkeleton = false;
      state.error = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchNewFeedVideosInit(state, action: PayloadAction<IGetNewFeedVideos>) {
      state.isMoreLoading = true;
    },
    fetchNewFeedVideosSuccess(state, action: PayloadAction<DTOVod[]>) {
      const { payload: videos } = action;
      state.isMoreLoading = false;
      if (videos.length) {
        state.videos = updateFeed<DTOVod>(state.videos, videos);
        videos.forEach(({ id }) => {
          state.titleColors[id] = getTitleColors();
        });
      }
    },
    fetchNewFeedVideosError(state, action: PayloadAction<string>) {
      state.isMoreLoading = false;
      state.error = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateFeedInit(state, action: PayloadAction<DTOWebSocketsVOD>) {
      state.loading = initialState.loading;
    },
    updateFeedSuccess(state, action: PayloadAction<DTOWebSocketsVOD>) {
      const {
        data,
        type,
      } = action.payload;

      state.loading = false;

      switch (type) {
        case EWebSocketEventTypes.videoUpdated:
        case EWebSocketEventTypes.vodCreated:
        case EWebSocketEventTypes.vodUpdated: {
          state.videos = updateFeed<DTOVod>(state.videos, [data]);
          if (!state.titleColors[data.id]) state.titleColors[data.id] = getTitleColors();
          break;
        }
        case EWebSocketEventTypes.videoHidden:
        case EWebSocketEventTypes.vodHidden:
          state.videos = state.videos.filter((element) => element.id !== data.id);
          break;
        default:
          break;
      }
    },
    updateFeedError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleVODSuccess(state, action: PayloadAction<{ id: number; viewsCount: number }>) {
      const {
        id,
        viewsCount,
      } = action.payload;
      const videoIndex = state.videos.findIndex((el) => el.id === id);
      if (typeof videoIndex === 'number') state.videos[videoIndex].viewsCount = viewsCount;
    },
    removeFeedVideoById(state, action: PayloadAction<number>) {
      state.videos = state.videos.filter(({ id }) => id !== action.payload);
    },
    handleShowLoadMore(state) {
      state.showLoadMore = false;
    },
  },
});

export const {
  actions,
  reducer,
} = slice;
