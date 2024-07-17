import { MyBooking } from '../../common/types';
import { MY_BOOKINGS_TYPES } from '../../common/enums';

type AddBooking= {
    type: MY_BOOKINGS_TYPES.ADD_BOOKING,
    payload:MyBooking
}

type DeleteBooking = {
    type: MY_BOOKINGS_TYPES.DELETE_BOOKING,
    payload:MyBooking
}

export const addBooking = (payload: MyBooking):AddBooking => {
  return {
    type: MY_BOOKINGS_TYPES.ADD_BOOKING,
    payload
  };
};

export const deleteBooking = (payload: MyBooking): DeleteBooking => {
  return {
    type: MY_BOOKINGS_TYPES.DELETE_BOOKING,
    payload
  };
};

export type Action= AddBooking | DeleteBooking