import {
  put, call, takeLatest, SagaReturnType, select, SelectEffect, CallEffect, PutEffect,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as api from '@api';
import { DTOFeedInfo } from '@api/feed/types';
import { selectTeamId } from '@store/teams/selectors';
import { IGetFeedInfo } from '@api/livestream/types';
import { actions } from './slice';

function* fetchFeedInfoWorker(): Generator<SelectEffect
  | CallEffect<AxiosResponse<DTOFeedInfo>>
  | PutEffect<{ payload: DTOFeedInfo, type: string }>
  | PutEffect<{ payload: string, type: string }>> {
  try {
    const teamId = yield select(selectTeamId);
    const res = yield call(api.getFeedInfo, {
      teamId,
    } as IGetFeedInfo);
    const typedRes = res as SagaReturnType<typeof api.getFeedInfo>;
    yield put(actions.fetchFeedInfoSuccess(typedRes.data));
  } catch (e) {
    const error = e as Error;
    yield put(actions.fetchFeedInfoError(error?.message));
  }
}

export function* saga(): Generator {
  yield takeLatest(actions.fetchFeedInfoInit.type, fetchFeedInfoWorker);
}
