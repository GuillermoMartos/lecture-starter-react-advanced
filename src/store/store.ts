import { Middleware } from 'redux';
import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { usersService } from '../services/services';

const logger: Middleware = (store) => (next) => (action) => {
  console.info('state before', store.getState());
  console.info('action dispatching', action);
  const result=next(action);
  console.info('state after action', result);
  return result;
};

export const extraArgument = {
  usersService,
};


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: { extraArgument }
  }).concat(logger),
});
