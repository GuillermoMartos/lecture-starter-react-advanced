import { FiltersAppliedState, TripOption } from './types';
import trips from '../assets/data/trips.json';

export const getMatchingTrips = (filtersApplied:FiltersAppliedState) => {
  const validFilters = Object.entries(filtersApplied).filter(
    ([, trips]) => trips.length > 0
  );
  
  if (validFilters.length > 1) {
    const idsArray = validFilters.map(([, trips]) => 
      new Set(trips.map(trip => trip.id))
    );
  
    const matchingIds = idsArray.reduce((acc, curr) => {
      return new Set([...acc].filter(id => curr.has(id)));
    });
  
    const matchingTrips = validFilters.flatMap(([, trips]) =>
      trips.filter(trip => matchingIds.has(trip.id))
    );
  
    const uniqueTrips = Array.from(new Set(matchingTrips.map(trip => trip.id)))
      .map(id => matchingTrips.find(trip => trip.id === id));
    return uniqueTrips;
  }
  
  return [];
};

export const filterTripById = (id:string):TripOption => {
  const filteredTrip = trips.filter(trip => {
    return trip.id === id;
  });
  if (filteredTrip.length === 0 || filteredTrip.length > 1) {
    alert('Unable to find trip with id provided');
  }
    
  return filteredTrip.pop() as TripOption;
};