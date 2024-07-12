import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import trips from '../../assets/data/trips.json';
import MainCard from '../main-card.tsx/main-card';

type Props = {
  isUserLogged: boolean
}

const Main = ({ isUserLogged }: Props): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLogged) {
      navigate('/sign-in');
    }
  }, [isUserLogged, navigate]);

  return (
    <>
      <main>
        <h1 className="visually-hidden">Travel App</h1>
        <section className="trips-filter">
          <h2 className="visually-hidden">Trips filter</h2>
          <form className="trips-filter__form" autoComplete="off">
            <label className="trips-filter__search input">
              <span className="visually-hidden">Search by name</span>
              <input
                data-test-id="filter-search"
                name="search"
                type="search"
                placeholder="search by title"
              />
            </label>
            <label className="select">
              <span className="visually-hidden">Search by duration</span>
              <select data-test-id="filter-duration" name="duration">
                <option value="">duration</option>
                <option value="0_x_5">&lt; 5 days</option>
                <option value="5_x_10">&lt; 10 days</option>
                <option value="10">&ge; 10 days</option>
              </select>
            </label>
            <label className="select">
              <span className="visually-hidden">Search by level</span>
              <select data-test-id="filter-level" name="level">
                <option value="">level</option>
                <option value="easy">easy</option>
                <option value="moderate">moderate</option>
                <option value="difficult">difficult</option>
              </select>
            </label>
          </form>
        </section>
        <section className="trips">
          <h2 className="visually-hidden">Trips List</h2>
          <ul className="trip-list">
            {trips.map(trip => {
              return (
                <MainCard
                  price={trip.price}
                  difficulty={trip.level}
                  title={trip.title}
                  days={trip.duration}
                  photoSrc={trip.image}
                  key={trip.id}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;