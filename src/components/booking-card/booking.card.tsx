import { MyBooking } from '../../common/types';
import styles from './booking-card.module.css';

type Props = {
    myBooking: MyBooking,
    setMyBookings:React.Dispatch<React.SetStateAction<MyBooking[]>>
  }

const BookingCard = ({ myBooking,
  setMyBookings }: Props): JSX.Element => {
    
  function handleCancelBooking() {
    setMyBookings(prev => {
      const bookingsFiltered=prev.filter(trip=> trip.id!==myBooking.id);
      return bookingsFiltered;
    });
  }
    
  return (
    <>
      <li data-test-id="booking" className={styles.booking}>
        <h3 data-test-id="booking-title" className={styles.booking__title}>{ myBooking.title}</h3>
        <span data-test-id="booking-guests" className="booking__guests">
          {myBooking.guests} guests
        </span>
        <span data-test-id="booking-date" className="booking__date">
          {myBooking.date}
        </span>
        <span data-test-id="booking-total" className="booking__total">
            ${myBooking.price}
        </span>
        <button
          data-test-id="booking-cancel"
          className={styles.booking__cancel}
          title="Cancel booking"
          onClick={handleCancelBooking}
        >
          <span className="visually-hidden">Cancel booking</span>
            ×
        </button>
      </li>
    </>
  );
};

export default BookingCard;