
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
}

export const USER_TYPES:UserTypes = {
  USER_REDUCER_NAME: 'users',
  SIGN_IN: 'users/sign-in',
  SIGN_UP: 'users/sign-up',
  AUTH: 'users/auth',
  SET_STATUS: 'users/set-status'
};
