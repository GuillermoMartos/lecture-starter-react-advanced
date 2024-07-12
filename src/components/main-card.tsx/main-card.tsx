import { useNavigate } from 'react-router-dom';
import { MainCardProps } from '../../common/types';

const MainCard = ({ price, title, days, difficulty, photoSrc, id }: MainCardProps)
  : JSX.Element => {
  const navigate= useNavigate();
  
  return (
    <>
      <li data-test-id="trip-card" className="trip-card">
        <img
          data-test-id="trip-card-image"
          src={photoSrc}
          alt="trip photo"
        />
        <div className="trip-card__content">
          <div className="trip-info">
            <h3 data-test-id="trip-card-title" className="trip-info__title">
              {title }
            </h3>
            <div className="trip-info__content">
              <span
                data-test-id="trip-card-duration"
                className="trip-info__duration"
              >
                <strong>{ days}</strong> days
              </span>
              <span data-test-id="trip-card-level" className="trip-info__level">
                {difficulty}
              </span>
            </div>
          </div>
          <div className="trip-price">
            <span>Price</span>
            <strong
              data-test-id="trip-card-price-value"
              className="trip-price__value"
            >
            ${price}
            </strong>
          </div>
        </div>
        <a data-test-id="trip-card-link clickeable-pointer" onClick={()=>navigate(`/trip/${id}`)} className="button">
              Discover a trip
        </a>
      </li>
    </>
  );
};

export default MainCard;