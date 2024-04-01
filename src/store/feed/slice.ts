import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DTOFeedInfo } from '@api/feed/types';

export interface IState {
  feedInfo: DTOFeedInfo;
  isLoading: boolean;
  error: string;
}

const initialState: IState = {
  feedInfo: {},
  isLoading: false,
  error: '',
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    fetchFeedInfoInit(state) {
      state.isLoading = true;
    },
    fetchFeedInfoSuccess(state, action: PayloadAction<DTOFeedInfo>) {
      state.feedInfo = action.payload;
      state.isLoading = false;
    },
    fetchFeedInfoError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  actions,
  reducer,
} = feedSlice;
