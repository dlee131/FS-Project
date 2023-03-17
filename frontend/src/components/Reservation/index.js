import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getReservations,
  fetchReservations,
  updateReservation,
  deleteReservation,
} from "../../store/reservations";
import { getListings, fetchListings } from "../../store/listings";
import { useParams, NavLink, useHistory } from "react-router-dom";

function ReservationIndex() {
  const sessionUser = useSelector((state) => state.session.user);
  const reservations = useSelector(getReservations);
  const listings = useSelector(getListings);
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const dispatch = useDispatch();
  const history = useHistory();

  // Filter reservations by user ID
  const userReservations = reservations.filter(
    (reservation) => reservation.userId === sessionUser.id
  );

  useEffect(() => {
    dispatch(fetchReservations());
    // dispatch(fetchListings(listingId));
  }, [listingId, dispatch]);

  const handleDeleteReservation = (reservationId) => {
    dispatch(deleteReservation(reservationId));
    // debugger
  };
  

  const handleUpdateReservation = (reservationId) => {
    dispatch(updateReservation(reservationId));
  };
  const handleClick = (listingId) => {
    history.push(`/listings/${listingId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="Trips-index">
      <div className="trips-header">Trips</div>
      {userReservations.length === 0 && (
        <div className="no-trips">
          <h2 className="no-trips-text">No trips booked...yet!</h2>
          <div className="no-trips-text2">
            Time to dust off your bags and start planning your next adventure
          </div>
          <NavLink
            exact
            to="/"
            className="index-navlink"
            style={{ textDecoration: "none" }}
          >
            Start searching
          </NavLink>
        </div>
      )}

      {userReservations.map((reservation) => (
        <div key={reservation.id} className="reservations-index">
          <div className="reservation-photos">
            <img
              src={reservation.photo[0]}
              alt=""
              className="reservation-photo"
              onClick={() => handleClick(reservation.listingId)}
            />
          </div>
          <div className="reservation-description">
            <div className="reservation-city">
              {reservation.state}
            </div>
            <div className="reservation-residence">
             Entire {reservation.residenceType} hosted by {reservation.userName}
            </div>
            <div className="reservation-dates">
              {moment(reservation.startDate).format("MM/DD/YYYY")} -{" "}
              {moment(reservation.endDate).format("MM/DD/YYYY")}
            </div>
            <div className="reservation-guests">Number of Guests: {reservation.numGuests}</div>
            </div>
            <div className="reservation-buttons">
          <button
            onClick={() => handleDeleteReservation(reservation.id)}
            className="cancel-button"
          >
            Cancel Reservation
          </button>

          </div>
        </div>
      ))}
    </div>
  );
}

export default ReservationIndex;
