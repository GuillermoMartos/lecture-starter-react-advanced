import { useNavigate, useParams } from 'react-router-dom';
import { filterTripById } from '../../common/helpers';

const Trip = (): JSX.Element => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate=useNavigate();
  if (!tripId) {
    navigate('/');
  }
  const tripData = filterTripById(tripId as string);
  console.log(tripData);

  return (
    <>
      <main className="trip-page">
        <h1 className="visually-hidden">Travel App</h1>
        <div className="trip">
          <img
            data-test-id="trip-details-image"
            src={tripData.image}
            className="trip__img"
            alt="trip photo"
          />
          <div className="trip__content">
            <div className="trip-info">
              <h3 data-test-id="trip-details-title"
                className="trip-info__title">
                {tripData.title}
              </h3>
              <div className="trip-info__content">
                <span
                  data-test-id="trip-details-duration"
                  className="trip-info__duration"
                >
                  <strong>{ tripData.duration}</strong> days
                </span>
                <span data-test-id="trip-details-level" className="trip-info__level">
                  {tripData.level}
                </span>
              </div>
            </div>
            <div
              data-test-id="trip-details-description"
              className="trip__description"
            >
              {tripData.description}
            </div>
            <div className="trip-price">
              <span>Price</span>
              <strong
                data-test-id="trip-details-price-value"
                className="trip-price__value"
              >
              ${tripData.price}
              </strong>
            </div>
            <button
              data-test-id="trip-details-button"
              className="trip__button button"
            >
            Book a trip
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Trip;