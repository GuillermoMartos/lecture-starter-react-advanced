import { combineReducers } from 'redux';
import { tripsReducer } from './trips/reducer';
import { bookingsReducer } from './myBookings/reducer';
import { userReducer } from './users/users';

export const rootReducer = combineReducers({
  trips: tripsReducer,
  bookings: bookingsReducer,
  users: userReducer
});