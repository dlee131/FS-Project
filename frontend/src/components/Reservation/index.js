import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getReservations, fetchReservations } from "../../store/reservations";

function ReservationIndex() {
  const sessionUser = useSelector((state) => state.session.user);
  const reservations = useSelector(getReservations);
  debugger;
  const dispatch = useDispatch();
  const currentDate = moment();
  console.log(sessionUser);
  console.log(reservations);
  // Filter reservations by user ID
  const userReservations = reservations.filter(
    (reservation) => reservation.userId === sessionUser.id
  );

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div>
      {userReservations.map((reservation) => (
        <div key={reservation.id}>
          <p>
            Start date: {moment(reservation.startDate).format("MM/DD/YYYY")}
          </p>
          <p>End date: {moment(reservation.endDate).format("MM/DD/YYYY")}</p>
          <p>Number of Guests: {reservation.numGuests}</p>
        </div>
      ))}
    </div>
  );
}

export default ReservationIndex;
