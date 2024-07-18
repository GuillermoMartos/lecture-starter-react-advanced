
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { allBookingsActions } from '../myBookings/bookings';
import { allUserActions } from '../users/users';
import { allTripsActions } from '../trips/trips';
import { LOCAL_STORAGE_TOKEN } from '../../common/constants';
import { Bounce, toast } from 'react-toastify';

type ActionError = {
    message: string;
    name: string;
    stack: string;
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
    if (error && error.message.includes('401')) {
      toast.error('Unauthorized session. You have been logged out.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    }
  },
});

export default authListenerMiddleware;
