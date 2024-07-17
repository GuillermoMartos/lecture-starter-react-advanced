import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getTomorrowDate } from '../../common/helpers';
import sharedStyles from '../styles/shared-trip-card.module.css';
import style from './trip-detail.module.css';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { allBookingsActions } from '../../store/myBookings/bookings';
import { useNavigate } from 'react-router-dom';


type Props = {
  title: string, level: string, duration: number, price: number, tripId:string
}

const TripDetail = ({ title, level,
  duration, price, tripId }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate= useNavigate();
  const [ guestsNumber, setGuestsNumber ] = useState<number>(1);
  const [ minDate, setMinDate ] = useState('');
  const token= useAppSelector(state=>state.users.token);

  if (!token) {
    navigate('/sign-in');
  }

  useEffect(() => {
    setMinDate(getTomorrowDate());
  }, []);

  function getPrice() {
    return price * guestsNumber;
  }

  const handleGuestsNumberChange = (e:ChangeEvent<HTMLInputElement>) => {
    setGuestsNumber(+e.target.value);
  };

  const handleCloseModal = () => {
    document.getElementById('hideable-modal')?.setAttribute('hidden', 'true');
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myBooking = {
      tripId,
      guests: guestsNumber,
      date:(e.currentTarget.elements.namedItem('date')as HTMLInputElement).value,
    };
    dispatch(allBookingsActions.createNewBooking(
      { payload: myBooking, token: token as string }
    ));
  };  

  return (
    <div id="hideable-modal" hidden>
      <div className={style.modal}>
        <div data-test-id="book-trip-popup" className={style['book-trip-popup']}>
          <button
            data-test-id="book-trip-popup-close"
            className={style['book-trip-popup__close']}
            onClick={handleCloseModal}
          >
      ×
          </button>
          <form className={style['book-trip-popup__form']} autoComplete="off" onSubmit={handleSubmit}>
            <div className={sharedStyles['trip-info']}>
              <h3 data-test-id="book-trip-popup-title" className={sharedStyles['trip-info__title']}>
                {title}
              </h3>
              <div className={sharedStyles['trip-info__content']}>
                <span
                  data-test-id="book-trip-popup-duration"
                  className="trip-info__duration"
                >
                  <strong>{ duration}</strong> days
                </span>
                <span
                  data-test-id="book-trip-popup-level"
                  className={sharedStyles['trip-info__level']}
                >
                  { level}
                </span>
              </div>
            </div>
            <label className="input">
              <span className="input__heading">Date</span>
              <input
                data-test-id="book-trip-popup-date"
                name="date"
                type="date"
                min={minDate}
                required
              />
            </label>
            <label className="input">
              <span className="input__heading">Number of guests</span>
              <input
                data-test-id="book-trip-popup-guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                value={guestsNumber}
                onChange={handleGuestsNumberChange}
                required
              />
            </label>
            <span className={style['book-trip-popup__total']}>
        Total:
              <output
                data-test-id="book-trip-popup-total-value"
                className={style['book-trip-popup__total-value']}
              >
          ${getPrice()}
              </output>
            </span>
            <button
              data-test-id="book-trip-popup-submit"
              className="button"
              type="submit"
            >
        Book a trip
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;