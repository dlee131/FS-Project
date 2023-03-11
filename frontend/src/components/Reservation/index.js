import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getReservations, fetchReservations } from "../../store/reservations";
import { getListings } from "../../store/listings";
import { fetchListings } from "../../store/listings";
import { useParams } from "react-router-dom";

function ReservationIndex() {
  const sessionUser = useSelector((state) => state.session.user);
  const reservations = useSelector(getReservations);
  const listings = useSelector(getListings);
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const dispatch = useDispatch();

  // Filter reservations by user ID
  const userReservations = reservations.filter(
    (reservation) => reservation.userId === sessionUser.id
  );

  useEffect(() => {
    dispatch(fetchReservations());
    dispatch(fetchListings(listingId));
  }, [listingId, dispatch]);

  return (
    <div>
      {userReservations.map((reservation) => (
        <div key={reservation.id}>
          <p>Start date: {moment(reservation.startDate).format("MM/DD/YYYY")}</p>
          <p>End date: {moment(reservation.endDate).format("MM/DD/YYYY")}</p>
          <p>Number of Guests: {reservation.numGuests}</p>
        </div>
      ))}
    </div>
  );
}

export default ReservationIndex;
