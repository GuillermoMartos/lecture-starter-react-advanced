import { AppDispatch, RootState } from '../components/hooks/types';
import { extraArgument } from '../store/store';

export type MainCardProps = {
    price: number,
    title: string,
    days: number,
    difficulty: string,
    photoSrc: string,
    id:string
}

export type TripOption = {
    id: string;
    title: string;
    description: string;
    level: string;
    duration: number;
    price: number;
    image: string;
    createdAt: string;
    }
  

export type FiltersAppliedState = {
        SEARCH: string|null;
        DURATION: string|null;
        DIFFICULTY: string|null;
};  

export enum FILTER_OPTIONS{
  DURATION='DURATION',
  DIFFICULTY='DIFFICULTY',
  SEARCH='SEARCH'
}

export type FiltersUpdatePayload =
  {
    value: string | null,
    name: FILTER_OPTIONS
  }

export type MyBooking = {
  date:string,
  guests: number,
  tripId: string,
  level: string,
  price: number,
  id: string,
  title:string
}

export type UserSignInUpResponse={
  user: {
      id: string,
      fullName: string,
      email: string,
      createdAt: string
  },
  token: string
}

export type UserAuthResponse={
  id: string,
  fullName: string,
  email: string,
  createdAt: string
}

export type SignInRequestBody = {
  email: string,
  password: string
}

export type SignUpRequestBody = {
  email: string,
  password: string,
  fullName: string
}

export type AsyncThunkConfig = {
  state: RootState,
  dispatch: AppDispatch,
  extra: typeof extraArgument
}

export type GetTripByIdPayload = {
  token: string;
  id: string;
};

export type TripResponse= {
  id: string,
  title: string,
  description: string,
  level: string,
  duration:number,
  price:number,
  image: string,
  createdAt: string
}

export type AllTripsResponse = TripResponse[]

export type MyBookingResponse= {
  id: string,
  tripId: string,
  userId: string,
  guests: number,
  totalPrice: number,
  date: string,
  createdAt: string,
  trip: {
    title: string,
    duration: number,
    price: number
  }
}

export type AllMyBookingsResponse = MyBookingResponse[]

export type BookingCreateRequestBody={
  tripId: string,
  guests: number,
  date: string
}

export type CancelBookingResponse = 'true'

export type CreateBookingPayload = {
  token: string;
  payload:BookingCreateRequestBody
};

export type CancelBookingByIdPayload = GetTripByIdPayload
