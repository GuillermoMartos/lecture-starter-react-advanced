import { AllMyBookingsResponse, AllTripsResponse, MyBooking, TripOption, TripResponse } from '../../common/types';

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

export function mapAllBookingsResponseToMyBooking
(bookingsAPIResponse: AllMyBookingsResponse): MyBooking[] {
  const myBookingsMapped: MyBooking[] = [];
  for (const booking of bookingsAPIResponse) {
    myBookingsMapped.push({
      title:booking.trip.title,
      date:booking.date,
      price: booking.totalPrice,
      level:'fetch it',
      guests: booking.guests,
      id: booking.id
    }
    );
  }
  return myBookingsMapped;
}