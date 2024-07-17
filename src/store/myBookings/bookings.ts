import { bookingsActions } from './actions';
import { bookingsReducerActions, bookingReducer } from './slice';

const allBookingsActions = {
  ...bookingsReducerActions,
  ...bookingsActions,
};

export { allBookingsActions, bookingReducer };