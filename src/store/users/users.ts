import { userActions } from './actions';
import { userReducerActions, userReducer } from './slice';

const allUserActions = {
  ...userReducerActions,
  ...userActions,
};

export { allUserActions, userReducer };