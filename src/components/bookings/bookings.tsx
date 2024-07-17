
import { useEffect } from 'react';
import BookingCard from '../booking-card/booking.card';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import styles from './bookings.module.css';
import { allBookingsActions } from '../../store/myBookings/bookings';
import Loader from '../loader/loader';

const Bookings = (): JSX.Element => {
  const dispatch= useAppDispatch();
  const myBookings = useAppSelector(state => state.bookings.myBookings);
  const token = useAppSelector((state) => state.users.token);

  useEffect(() => {
    if (token) {
      dispatch(allBookingsActions.getAllMyBookings(token));
    }
  }, [ dispatch, token ]);
  
  return (
    <>
      <main className={styles['bookings-page']}>
        <h1 className="visually-hidden">Travel App</h1>
        <ul className={styles.bookings__list}>
          {myBookings ? myBookings.map(booking => {
            return <BookingCard key={booking.id} myBooking={booking}/>;
          }) :
            <Loader></Loader>
          }
        </ul>
      </main>
    </>
  );
};

export default Bookings;