import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: [],
      ignoredActionPaths: ['payload.currentTime'],
    },
  })
    .concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export default store;

export const { dispatch } = store; // only for use in addInterceptor

export * as actions from './actions';
export * as selectors from './selectors';
export * from './types';
