import { TripOption } from './types';


export const filterTripById = (id:string, trips:TripOption[ ]):TripOption => {
  const filteredTrip = trips.filter(trip => {
    return trip.id === id;
  });
  if (filteredTrip.length === 0 || filteredTrip.length > 1) {
    alert('Unable to find trip with id provided');
  }
    
  return filteredTrip.pop() as TripOption;
};

export const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};