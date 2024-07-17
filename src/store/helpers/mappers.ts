import { AllTripsResponse, TripOption, TripResponse } from '../../common/types';

export function mapAllTripsResponseToTripOption
(tripsAPIResponse: AllTripsResponse): TripOption[] {
  const tripOptionsMapped: TripOption[] = [];
  for (const trip of tripsAPIResponse) {
    tripOptionsMapped.push({
      id: trip.id,
      title: trip.title,
      description: trip.description,
      level: trip.level,
      duration: trip.duration,
      price: trip.price,
      image: trip.image,
      createdAt: trip.createdAt }
    );
  }
  return tripOptionsMapped;
}

export function mapTripResponseByIdToTripOption
(tripAPIResponse: TripResponse): TripOption {
  const tripOptionMapped: TripOption = {
    id: tripAPIResponse.id,
    title: tripAPIResponse.title,
    description: tripAPIResponse.description,
    level: tripAPIResponse.level,
    duration: tripAPIResponse.duration,
    price: tripAPIResponse.price,
    image: tripAPIResponse.image,
    createdAt: tripAPIResponse.createdAt 
  };

  return tripOptionMapped;
}