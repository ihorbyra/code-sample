import rootReducer from './reducers';

export type RootState = ReturnType<typeof rootReducer>;

export interface IDispatch {
  payload: undefined;
  type: string;
}
