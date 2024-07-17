import { MyBooking } from '../../common/types';
import { MY_BOOKINGS_TYPES } from '../../common/enums';
import { Action } from './actions';

export type BookingsState = {
    myBookings:MyBooking[],
}

const initialTripsState: BookingsState = {
  myBookings:[]
};

export const bookingsReducer = (state = initialTripsState, action: Action):
    BookingsState => {
  switch (action.type) {
  case MY_BOOKINGS_TYPES.ADD_BOOKING:
    return state = { ...state, myBookings:[ ...state.myBookings, action.payload ] };
  case MY_BOOKINGS_TYPES.DELETE_BOOKING:
    return state = {
      ...state,
      myBookings: state.myBookings.filter(booking=> booking.id!== action.payload.id)
    };
  default:
    return state;
  }
};