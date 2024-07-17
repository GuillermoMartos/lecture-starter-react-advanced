import { tripsActions } from './actions';
import { tripsReducerActions, tripsReducer } from './slice';

const allTripsActions = {
  ...tripsReducerActions,
  ...tripsActions,
};

export { allTripsActions, tripsReducer };