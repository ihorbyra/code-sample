import {
  takeLatest, call, SagaReturnType, CallEffect, PutEffect, SelectEffect, put, select,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as api from '@api';
import { DTOLiveStream, IGetLives } from '@api/types';
import { DTOWebSocketsLiveStream } from '@services/webSockets';
import { selectTeamId } from '@store/teams/selectors';
import { actions } from './slice';

function* fetchLivesWorker(): Generator<SelectEffect
  | CallEffect<AxiosResponse<Array<DTOLiveStream>>>
  | PutEffect<{ payload: Array<DTOLiveStream>, type: string }>
  | PutEffect<{ payload: string, type: string }>> {
  try {
    const teamId = yield select(selectTeamId);
    const res = yield call(api.getLives, {
      teamId,
    } as IGetLives);
    const typedRes = res as SagaReturnType<typeof api.getLives>;
    yield put(actions.fetchLivesSuccess([
      ...typedRes.data,
    ]));
  } catch (e) {
    const error = e as Error;
    yield put(actions.fetchLivesError(error?.message));
  }
}

function* updateLivesWorker({ payload }: { payload: DTOWebSocketsLiveStream, type: string }): Generator {
  try {
    yield put(actions.updateLivesSuccess(payload));
  } catch (e) {
    const error = e as Error;
    yield put(actions.updateLivesError(error?.message));
  }
}

export function* saga(): Generator {
  yield takeLatest(actions.fetchLivesInit.type, fetchLivesWorker);
  yield takeLatest(actions.updateLivesInit.type, updateLivesWorker);
}
