import { useAppSelector } from '../hooks/redux-hooks';
import MainCard from '../main-card.tsx/main-card';
import MainFilters from '../main-filters.tsx/main-filters';
import sharedStyles from '../styles/shared-trip-card.module.css';


const Main = ()
  : JSX.Element => {
  const tripsData= useAppSelector((state)=> state.trips.filteredTrips);


  return (
    <>
      <main>
        <h1 className="visually-hidden">Travel App</h1>
        <MainFilters/>
        <section className={sharedStyles.trip}>
          <h2 className="visually-hidden">Trips List</h2>
          <ul className={sharedStyles['trip-list']}>
            {tripsData && tripsData.map(trip => {
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
            })}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;