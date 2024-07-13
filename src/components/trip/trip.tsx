import { useNavigate, useParams } from 'react-router-dom';
import { filterTripById } from '../../common/helpers';
import TripDetail from '../trip-detail/trip-detail';
import { MyBooking } from '../../common/types';
import sharedStyles from '../styles/shared-trip-card.module.css';
import styles from './trip.module.css';



type Props = {
  setMyBookings:React.Dispatch<React.SetStateAction<MyBooking[]>>
}

const Trip = ({setMyBookings }:Props): JSX.Element => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate=useNavigate();
  if (!tripId) {
    navigate('/');
  }
  const tripData = filterTripById(tripId as string);

  return (
    <>
      <main className={styles['trip-page']}>
        <h1 className="visually-hidden">Travel App</h1>
        <div className={styles.trip}>
          <img
            data-test-id="trip-details-image"
            src={tripData.image}
            className={styles.trip__img}
            alt="trip photo"
          />
          <div className={styles.trip__content}>
            <div className={sharedStyles['trip-info']}>
              <h3 data-test-id="trip-details-title"
                className={sharedStyles['trip-info__title']}>
                {tripData.title}
              </h3>
              <div className={sharedStyles['trip-info__content']}>
                <span
                  data-test-id="trip-details-duration"
                  className="trip-info__duration"
                >
                  <strong>{ tripData.duration}</strong> days
                </span>
                <span data-test-id="trip-details-level" className={sharedStyles['trip-info__level']}>
                  {tripData.level}
                </span>
              </div>
            </div>
            <div
              data-test-id="trip-details-description"
              className={styles.trip__description}
            >
              {tripData.description}
            </div>
            <div className="trip-price">
              <span>Price</span>
              <strong
                data-test-id="trip-details-price-value"
                className={sharedStyles['trip-price__value']}
              >
              ${tripData.price}
              </strong>
            </div>
            <button
              data-test-id="trip-details-button"
              className={`${styles.trip__button} button`}
              onClick={() => {
                document.getElementById('hideable-modal')?.removeAttribute('hidden');
              }}
            >
            Book a trip
            </button>
          </div>
        </div>
      </main>
      <TripDetail title={tripData.title} price={tripData.price}
        level={tripData.level} duration={tripData.duration}
        setMyBookings={setMyBookings} />
    </>
  );
};

export default Trip;