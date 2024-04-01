import {
  call, CallEffect, put, PutEffect, SagaReturnType, select, SelectEffect, takeLatest,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as api from '@api';
import { config } from '@config';
import { IGetFeedPosts, DTOPosts } from '@api/types';
import { selectTeamId } from '@store/teams/selectors';
import { DTOWebSocketsPosts } from '@services/webSockets';
import { actions } from './slice';

const { limit } = config.features.posts;

function* fetchPostsWorker({ payload }: { payload: number, type: string }): Generator<SelectEffect
  | CallEffect<AxiosResponse<Array<DTOPosts>>>
  | PutEffect<{ payload: { posts: DTOPosts[] }, type: string }>
  | PutEffect<{ payload: string, type: string }>> {
  try {
    const countLoadedPosts = payload;
    const teamId = yield select(selectTeamId);
    const res = yield call(api.getFeedPosts, {
      count: countLoadedPosts,
      limit,
      teamId,
    } as IGetFeedPosts);

    const typedRes = res as SagaReturnType<typeof api.getFeedPosts>;
    const posts = <DTOPosts[]>typedRes.data;
    yield put(actions.fetchPostsSuccess(
      {
        posts,
      },
    ));
  } catch (e) {
    const error = e as Error;
    yield put(actions.fetchPostsError(error?.message));
  }
}

function* updatePostsWorker({ payload }: { payload: DTOWebSocketsPosts, type: string }): Generator {
  try {
    yield put(actions.updatePostsSuccess(payload));
  } catch (e) {
    const error = e as Error;
    yield put(actions.updatePostsError(error?.message));
  }
}

export function* saga(): Generator {
  yield takeLatest(actions.fetchPostsInit.type, fetchPostsWorker);
  yield takeLatest(actions.updatePostsInit.type, updatePostsWorker);
}
