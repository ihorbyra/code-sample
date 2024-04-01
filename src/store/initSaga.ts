import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import { getStorageItem } from '@utils';
import { i18nService } from '@services';
import * as actions from './actions';

function* handleTeamsData(): Generator {
  const idToken = getStorageItem('idToken');
  if (idToken) {
    yield put(actions.profile.getProfileInit());
  } else {
    yield put(actions.profile.setAnonymousUser(true));
  }

  yield all([
    put(actions.feed.fetchFeedInfoInit()),
    put(actions.videos.fetchFeedVideosInit(0)),
    put(actions.lives.fetchLivesInit()),
  ]);
}

export function* saga(): Generator {
  yield i18nService.init();
  yield put(actions.teams.fetchTeamsDataInit());

  yield takeLatest(actions.teams.fetchTeamsDataSuccess.type, handleTeamsData);
}
