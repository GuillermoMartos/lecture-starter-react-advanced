
import BookingCard from '../booking-card/booking.card';
import { useAppSelector } from '../hooks/redux-hooks';
import styles from './bookings.module.css';

const Bookings = (): JSX.Element => {
  const myBookings= useAppSelector(state=> state.bookings.myBookings);
  return (
    <>
      <main className={styles['bookings-page']}>
        <h1 className="visually-hidden">Travel App</h1>
        <ul className={styles.bookings__list}>
          {myBookings && myBookings.map(booking => {
            return <BookingCard key={booking.id} myBooking={booking}/>;
          })}
        </ul>
      </main>
    </>
  );
};

export default Bookings;