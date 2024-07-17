import { combineReducers } from 'redux';
import { userReducer } from './users/users';
import { tripsReducer } from './trips/trips';
import { bookingReducer } from './myBookings/bookings';

export const rootReducer = combineReducers({
  trips: tripsReducer,
  bookings: bookingReducer,
  users: userReducer
});