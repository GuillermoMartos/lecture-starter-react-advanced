import { MyBooking } from '../../common/types';
import BookingCard from '../booking-card/booking.card';

type Props = {
  myBookings: MyBooking[],
  setMyBookings:React.Dispatch<React.SetStateAction<MyBooking[]>>
}

const Bookings = ({ myBookings, setMyBookings }:Props): JSX.Element => {
  return (
    <>
      <main className="bookings-page">
        <h1 className="visually-hidden">Travel App</h1>
        <ul className="bookings__list">
          {myBookings && myBookings.map(booking => {
            return <BookingCard key={booking.id} myBooking={booking}
              setMyBookings={setMyBookings} />;
          })}
        </ul>
      </main>
    </>
  );
};

export default Bookings;