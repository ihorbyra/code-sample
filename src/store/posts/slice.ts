import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DTOPosts, EPostSource } from '@api/types';
import { config } from '@config';
import { DTOWebSocketsPosts, EWebSocketEventTypes } from '@services/webSockets';
import { updateFeed } from '@store/videos/utils';
import { matchRoutePath, routes } from '@routes';

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
  nextBunchLoaded: boolean;
  error: string;
  posts: DTOPosts[];
  selectedPost: DTOPosts | null;
  showSkeleton: boolean;
  showDetailsScreen: boolean;
  removedIds: number[];
}

interface IFetchPostsSuccessPayload {
  posts: DTOPosts[];
}

const initialState: PostsState = {
  loading: false,
  isMoreLoading: false,
  canLoadMore: true,
  nextBunchLoaded: false,
  error: '',
  posts: [],
  selectedPost: null,
  showSkeleton: true,
  showDetailsScreen: false,
  removedIds: [],
};

const { limit } = config.features.posts;

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchPostsInit(state, action: PayloadAction<number>) {
      if (state.posts.length) {
        state.isMoreLoading = true;
        state.nextBunchLoaded = true;
      } else {
        state.loading = true;
      }
    },
    fetchPostsSuccess(state, action: PayloadAction<IFetchPostsSuccessPayload>) {
      const { posts } = action.payload;
      if (!posts.length || posts.length < limit) {
        state.canLoadMore = false;
      }
      state.loading = false;
      state.isMoreLoading = false;
      state.showSkeleton = false;
      state.posts.push(...posts);
    },
    fetchPostsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isMoreLoading = false;
      state.showSkeleton = false;
      state.error = action.payload;
    },

    fetchNewFeedPostsSuccess(state, action: PayloadAction<DTOPosts[]>) {
      const { payload: posts } = action;
      if (posts?.length) {
        state.posts = updateFeed<DTOPosts>(state.posts, posts);
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePostsInit(state, action: PayloadAction<DTOWebSocketsPosts>) {
      state.loading = true;
    },
    updatePostsSuccess(state, action: PayloadAction<DTOWebSocketsPosts>) {
      const {
        data,
        type,
      } = action.payload;

      switch (type) {
        case EWebSocketEventTypes.postCreated:
        case EWebSocketEventTypes.postPublished:
          state.posts.unshift({
            source: EPostSource.webSockets,
            ...data,
          });
          break;
        case EWebSocketEventTypes.postHidden: {
          const matchPath = matchRoutePath(routes.HOME);

          if (matchPath) {
            state.removedIds.push(data.id);
          } else {
            state.posts = state.posts.filter(({ id }) => id !== data.id);
          }

          if (state.selectedPost && state.selectedPost.id === data.id) {
            state.showDetailsScreen = false;
            state.selectedPost = null;
          }
          break;
        }
        default:
          break;
      }
      state.loading = false;
    },
    updatePostsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    removePostById(state, action: PayloadAction<number>) {
      const { payload: removedId } = action;
      state.posts = state.posts.filter(({ id }) => id !== removedId);
    },

    addSelectedPost(state, action: PayloadAction<number>) {
      const id = action.payload;
      const selectedPost = state.posts.filter((item) => item.id === id);
      state.selectedPost = {
        ...selectedPost[0],
      };
    },

    removeItemOnAnimationDone(state, action: PayloadAction<number>) {
      state.removedIds = state.removedIds.filter((id) => id !== action.payload);
      state.posts = state.posts.filter(({ id }) => id !== action.payload);
    },

    toggleDetailsScreen(state) {
      state.showDetailsScreen = !state.showDetailsScreen;
    },
  },
});

export const {
  actions,
  reducer,
} = slice;
