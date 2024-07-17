import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import MainCard from '../main-card.tsx/main-card';
import MainFilters from '../main-filters.tsx/main-filters';
import sharedStyles from '../styles/shared-trip-card.module.css';
import { allTripsActions } from '../../store/trips/trips';
import Loader from '../loader/loader';


const Main = ()
  : JSX.Element => {
  const dispatch= useAppDispatch();
  const token = useAppSelector((state) => state.users.token);
  const tripsData = useAppSelector((state) => state.trips.filteredTrips);
  
  useEffect(() => {
    if (token) {
      dispatch(allTripsActions.getAllAPITrips(token));
    }
  }, [ dispatch, token ]);

  return (
    <>
      <main>
        <h1 className="visually-hidden">Travel App</h1>
        <MainFilters/>
        <section className={sharedStyles.trip}>
          <h2 className="visually-hidden">Trips List</h2>
          <ul className={sharedStyles['trip-list']}>
            {tripsData ? tripsData.map(trip => {
              return (
                <MainCard
                  price={trip.price}
                  difficulty={trip.level}
                  title={trip.title}
                  days={trip.duration}
                  photoSrc={trip.image}
                  key={trip.id}
                  id={trip.id}
                />
              );
            }) :
              <Loader></Loader>}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;