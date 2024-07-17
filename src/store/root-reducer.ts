import { combineReducers } from 'redux';
import { bookingsReducer } from './myBookings/reducer';
import { userReducer } from './users/users';
import { tripsReducer } from './trips/trips';

export const rootReducer = combineReducers({
  trips: tripsReducer,
  bookings: bookingsReducer,
  users: userReducer
});