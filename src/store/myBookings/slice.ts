import { MyBooking } from '../../common/types';
import { createSlice } from '@reduxjs/toolkit';
import { BOOKINGS_TYPES, DataStatus } from '../../common/enums';
import { ValueOf } from '../../services/constants';
import { bookingsActions } from './actions';
import { mapAllBookingsResponseToMyBooking, mapBookingResponseToMyBooking } from '../helpers/mappers';

type BookingsState = {
  status: ValueOf<typeof DataStatus>,
  myBookings:MyBooking[],
}

const initialBookingsState: BookingsState = {
  myBookings: [],
  status: DataStatus.IDLE
};

const { reducer, actions } = createSlice(
  {
    name: BOOKINGS_TYPES.BOOKINGS_REDUCER_NAME,
    initialState: initialBookingsState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(bookingsActions.setStatus, (state, action) => {
        state.status= action.payload;
      });

      builder.addCase(bookingsActions.getAllMyBookings.pending, (state) => {
        state.status= DataStatus.PENDING;
      });
      builder.addCase(bookingsActions.getAllMyBookings.fulfilled, (state, action) => {
        const mappedBookings= mapAllBookingsResponseToMyBooking(action.payload);
        state.myBookings = mappedBookings;
        state.status = DataStatus.SUCCESS;
      });
      builder.addCase(bookingsActions.getAllMyBookings.rejected, (state) => {
        state.status= DataStatus.ERROR;
      });
      
      builder.addCase(bookingsActions.createNewBooking.pending, (state) => {
        state.status= DataStatus.PENDING;
      });
      builder.addCase(bookingsActions.createNewBooking.fulfilled, (state, action) => {
        const mappedBooking = mapBookingResponseToMyBooking(action.payload);
        state.myBookings = [ ...state.myBookings, mappedBooking ];
        state.status = DataStatus.SUCCESS;
      });
      builder.addCase(bookingsActions.createNewBooking.rejected, (state) => {
        state.status= DataStatus.ERROR;
      });
    
      builder.addCase(bookingsActions.cancelBooking.pending, (state) => {
        state.status= DataStatus.PENDING;
      });
      builder.addCase(bookingsActions.cancelBooking.fulfilled, (state, action) => {
        console.log(action.meta.arg, 'aca le saco el id :)');
        state.status = DataStatus.SUCCESS;
      });
      builder.addCase(bookingsActions.cancelBooking.rejected, (state) => {
        state.status= DataStatus.ERROR;
      });

    },
  }
);

export { actions as bookingsReducerActions, reducer as bookingReducer };

