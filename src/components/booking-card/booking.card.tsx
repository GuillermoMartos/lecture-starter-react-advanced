import { MyBooking } from '../../common/types';
import { allBookingsActions } from '../../store/myBookings/bookings';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import styles from './booking-card.module.css';
import { useNavigate } from 'react-router-dom';

type Props = {
    myBooking: MyBooking,
  }

const BookingCard = ({ myBooking }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate= useNavigate();
  const token= useAppSelector(state=>state.users.token);

  if (!token) {
    navigate('/sign-in');
  }
    
  function handleCancelBooking() {
    dispatch(allBookingsActions
      .cancelBooking({ id: myBooking.id, token: token as string }));
  }
    
  return (
    <>
      <li data-test-id="booking" className={styles.booking}>
        <h3 data-test-id="booking-title" className={styles.booking__title}>{ myBooking.title}</h3>
        <span data-test-id="booking-guests" className="booking__guests">
          {myBooking.guests} guests
          {myBooking.level} LEVEL!!!
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