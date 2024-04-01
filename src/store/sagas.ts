import { all, Effect } from 'redux-saga/effects';

import { saga as initSaga } from './initSaga';
import { saga as teamsSaga } from './teams';
import { saga as authSaga } from './auth';
import { saga as profileSaga } from './profile';
import { saga as videosSaga } from './videos';
import { saga as feedSaga } from './feed';
import { saga as livesSaga } from './lives';
import { saga as videoSaga } from './video';
import { saga as feedbackSaga } from './feedback';
import { saga as paymentsSaga } from './payments';
import { saga as postsSaga } from './posts';
import { saga as microTransactions } from './microtransactions';
import { saga as pollsSaga } from './polls';
import { saga as localizationSaga } from './localization';

export default function* rootSaga(): Generator<Effect> {
  yield all([
    initSaga(),
    teamsSaga(),
    authSaga(),
    profileSaga(),
    videosSaga(),
    feedSaga(),
    livesSaga(),
    videoSaga(),
    feedbackSaga(),
    microTransactions(),
    paymentsSaga(),
    postsSaga(),
    pollsSaga(),
    localizationSaga(),
  ]);
}
