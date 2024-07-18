
export enum DataStatus{
    IDLE='idle',
    PENDING='pending',
    SUCCESS='success',
    ERROR='error',
    }



export enum MY_BOOKINGS_TYPES{
    ADD_BOOKING = 'bookings/add-booking',
    DELETE_BOOKING = 'bookings/delete-booking'
}

export enum FILTER_TRIPS_TYPES{
    FILTER_TRIPS = 'trips/filter-trips',
    CHANGE_FILTERS = 'trips/change-filters'
}

interface UserTypes {
    USER_REDUCER_NAME: 'users';
    SIGN_IN: string;
    SIGN_UP: string;
    AUTH: string;
    SET_STATUS: string;
    SET_NULL_TOKEN: string;
}

export const USER_TYPES:UserTypes = {
  USER_REDUCER_NAME: 'users',
  SIGN_IN: 'users/sign-in',
  SIGN_UP: 'users/sign-up',
  AUTH: 'users/auth',
  SET_STATUS: 'users/set-status',
  SET_NULL_TOKEN: 'users/set-null-token'
};

interface TripsTypes {
    TRIPS_REDUCER_NAME: 'trips';
    GET_ALL_TRIPS: string;
    GET_TRIP_BY_ID: string;
    UPDATE_FILTERED_TRIPS: string;
    UPDATE_FILTER_OPTIONS: string;
    RESET_FILTER_OPTIONS: string;
    SET_STATUS: string;
}

export const TRIPS_TYPES:TripsTypes = {
  TRIPS_REDUCER_NAME: 'trips',
  GET_ALL_TRIPS: 'trips/get-all-trips',
  GET_TRIP_BY_ID: 'trips/get-trip-by-id',
  UPDATE_FILTERED_TRIPS: 'trips/update-filtered-trips',
  UPDATE_FILTER_OPTIONS: 'trips/update-filters-options',
  RESET_FILTER_OPTIONS: 'trips/reset-filters-options',
  SET_STATUS: 'trips/set-status'
};

interface BookingsTypes {
    BOOKINGS_REDUCER_NAME: 'bookings';
    GET_MY_BOOKINGS: string;
    CREATE_NEW_BOOKING: string;
    CANCEL_MY_BOOKING: string;
    SET_STATUS: string;
}

export const BOOKINGS_TYPES:BookingsTypes = {
  BOOKINGS_REDUCER_NAME: 'bookings',
  GET_MY_BOOKINGS: 'bookings/get-all-bookings',
  CREATE_NEW_BOOKING: 'bookings/create-booking',
  CANCEL_MY_BOOKING: 'bookings/cancel-booking-by-id',
  SET_STATUS: 'bookings/set-status'
};