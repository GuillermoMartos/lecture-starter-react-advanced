
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { allBookingsActions } from '../myBookings/bookings';
import { allUserActions } from '../users/users';
import { allTripsActions } from '../trips/trips';
import { LOCAL_STORAGE_TOKEN } from '../../common/constants';

type ActionError = {
    status: number;
    message: string;
}
const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  matcher: isAnyOf(
    allBookingsActions.getAllMyBookings.rejected,
    allBookingsActions.createNewBooking.rejected,
    allBookingsActions.cancelBooking.rejected,
    allUserActions.userAuth.rejected,
    allUserActions.userSignIn.rejected,
    allUserActions.userSignUp.rejected,
    allTripsActions.getAPITripById.rejected,
    allTripsActions.getAllAPITrips.rejected,
  ),
  effect: async (action) => {
    const error = action.error as ActionError;
    if (error && error.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      alert('final unath!');
    }
  },
});

export default authListenerMiddleware;
