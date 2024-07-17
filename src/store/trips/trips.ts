import { tripsActions } from './actions';
import { tripsReducerActions, tripsReducer } from './slice';

const allUserActions = {
  ...tripsReducerActions,
  ...tripsActions,
};

export { allUserActions, tripsReducer };