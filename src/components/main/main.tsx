import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from '../main-card.tsx/main-card';
import { TripOption } from '../../common/types';
import MainFilters from '../main-filters.tsx/main-filters';

type Props = {
  isUserLogged: boolean
  allTrips: TripOption[],
  selectedTrips: TripOption[],
  setSelectedTripsOptions:  React.Dispatch<React.SetStateAction<TripOption[]>>;
}

const Main = ({ isUserLogged, allTrips, selectedTrips, setSelectedTripsOptions }: Props)
  : JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLogged) {
      navigate('/sign-in');
    }
  }, [isUserLogged, navigate, selectedTrips]);

  return (
    <>
      <main>
        <h1 className="visually-hidden">Travel App</h1>
        <MainFilters allTrips={allTrips} selectedTrips={selectedTrips}
          setSelectedTrips={setSelectedTripsOptions} />
        <section className="trips">
          <h2 className="visually-hidden">Trips List</h2>
          <ul className="trip-list">
            {selectedTrips.map(trip => {
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