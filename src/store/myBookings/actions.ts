import {
  AllMyBookingsResponse, AsyncThunkConfig, CancelBookingByIdPayload,
  CancelBookingResponse, CreateBookingPayload, MyBookingResponse
} from '../../common/types';
import { BOOKINGS_TYPES, DataStatus } from '../../common/enums';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ValueOf } from '../../services/constants';

const setStatus = createAction(
  BOOKINGS_TYPES.SET_STATUS,
  (status: ValueOf<typeof DataStatus>) => {
    return {
      payload:status
    };
  }
);

const getAllMyBookings =
  createAsyncThunk<AllMyBookingsResponse, string, AsyncThunkConfig>
  (BOOKINGS_TYPES.GET_MY_BOOKINGS,
    async ( token,{ extra }) => {
      const { bookingsService } = extra;
    
      return await bookingsService.getMyBookings(token);
    });

const createNewBooking =
  createAsyncThunk<MyBookingResponse, CreateBookingPayload, AsyncThunkConfig>
  (BOOKINGS_TYPES.CANCEL_MY_BOOKING,
    async ( { token, id, payload },{ extra }) => {
      const { bookingsService } = extra;
   
      return  await bookingsService.createNewBooking(payload, token, id); 
    });

const cancelBooking =
  createAsyncThunk<CancelBookingResponse, CancelBookingByIdPayload, AsyncThunkConfig>
  (BOOKINGS_TYPES.CANCEL_MY_BOOKING,
    async ( { token, id },{ extra }) => {
      const { bookingsService } = extra;

      return await bookingsService.cancelBookingById(token, id);
    });


export const bookingsActions = {
  createNewBooking,
  getAllMyBookings,
  cancelBooking,
  setStatus
};