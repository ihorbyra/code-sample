import { combineReducers } from 'redux';

import { reducer as teams } from './teams';
import { reducer as auth } from './auth';
import { reducer as profile } from './profile';
import { reducer as videos } from './videos';
import { reducer as lives } from './lives';
import { reducer as common } from './common';
import { reducer as video } from './video';
import { reducer as feed } from './feed';
import { reducer as feedback } from './feedback';
import { reducer as microTransactions } from './microtransactions';
import { reducer as polls } from './polls';
import { reducer as posts } from './posts';
import { reducer as metabet } from './metabet';
import { reducer as payments } from './payments';
import { reducer as localization } from './localization';

const rootReducer = combineReducers({
  teams,
  auth,
  profile,
  videos,
  feed,
  lives,
  common,
  video,
  feedback,
  microTransactions,
  polls,
  metabet,
  payments,
  posts,
  localization,
});

export default rootReducer;
