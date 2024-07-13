import sharedStyles from '../styles/shared-trip-card.module.css';
import { Link } from 'react-router-dom';
import { MainCardProps } from '../../common/types';

const MainCard = ({ price, title, days, difficulty, photoSrc, id }: MainCardProps)
  : JSX.Element => {
  
  return (
    <>
      <li data-test-id="trip-card" className={sharedStyles['trip-card']}>
        <img
          data-test-id="trip-card-image"
          src={photoSrc}
          alt="trip photo"
        />
        <div className={sharedStyles['trip-card__content']}>
          <div className={sharedStyles['trip-info']}>
            <h3 data-test-id="trip-card-title" className={sharedStyles['trip-info__title']}>
              {title }
            </h3>
            <div className={sharedStyles['trip-info__content']}>
              <span
                data-test-id="trip-card-duration"
                className="trip-info__duration"
              >
                <strong>{ days}</strong> days
              </span>
              <span data-test-id="trip-card-level" className={sharedStyles['trip-info__level']}>
                {difficulty}
              </span>
            </div>
          </div>
          <div className="trip-price">
            <span>Price</span>
            <strong
              data-test-id="trip-card-price-value"
              className={sharedStyles['trip-price__value']}
            >
            ${price}
            </strong>
          </div>
        </div>
        <Link data-test-id="trip-card-link clickeable-pointer" to={`/trip/${id}`} className="button">
              Discover a trip
        </Link>
      </li>

      
    </>
  );
};

export default MainCard;