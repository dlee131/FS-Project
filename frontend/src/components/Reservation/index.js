import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getReservations,
  fetchReservations,
  updateReservation,
  deleteReservation,
} from "../../store/reservations";
import { useParams, NavLink, useHistory } from "react-router-dom";
import "./Reservation.css";

function ReservationIndex({ reservation }) {
  const sessionUser = useSelector((state) => state.session.user);
  const reservations = useSelector(getReservations);
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numGuests, setNumGuests] = useState();
  const [state, setState] = useState();
  const [errors, setErrors] = useState();
  const [selectedReservationId, setSelectedReservationId] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user?.id || null;

  const userReservations = reservations.filter(
    (reservation) => reservation.userId === sessionUser.id
  );

  if (reservation && !startDate && !endDate) {
    setStartDate(reservation.startDate);
    setEndDate(reservation.endDate);
  }

  useEffect(() => {
    dispatch(fetchReservations());
  }, [listingId]);

  useEffect(() => {
    setNumGuests(numAdults + numChildren);
  }, [numAdults, numChildren]);

  // console.log(listing)

  const handleDeleteReservation = (reservationId) => {
    dispatch(deleteReservation(reservationId));
  };

  const dropdown = (reservationId) => {
    if (selectedReservationId === reservationId) {
      setSelectedReservationId(null);
    } else {
      setSelectedReservationId(reservationId);
    }
  };

  const handleUpdateReservation = (e) => {
    e.preventDefault();
    setErrors([]);

    const reservationToUpdate = userReservations.find(
      (reservation) => reservation.id === selectedReservationId
    );

    if (reservationToUpdate) {
      const updatedReservation = {
        listing_id: reservationToUpdate.listing_id,
        id: selectedReservationId,
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
        num_guests: numGuests,
        state: state,
      };
      dispatch(updateReservation(updatedReservation))
        .then(() => {
          // Refresh the list of user reservations after the update is successful
          dispatch(fetchReservations(userId));
        })
        .catch((error) => {
          setErrors([error.message]);
        });
    }
  };

  const handleClick = (listingId, reservationId) => {
    setSelectedReservationId(reservationId);
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
            {reservation.photo && reservation.photo.length > 0 && (
              <img
                src={reservation.photo[0]}
                alt=""
                className="reservation-photo"
                onClick={() =>
                  handleClick(reservation.listingId, reservation.id)
                }
              />
            )}
          </div>
          <div className="reservation-description">
            <div className="reservation-state">{reservation.state}</div>
            <div className="reservation-residence">
              Entire {reservation.residenceType} hosted by{" "}
              {reservation.firstName}
            </div>
            <div className="reservation-dates">
              {moment(reservation.startDate).format("MM/DD/YYYY")} -{" "}
              {moment(reservation.endDate).format("MM/DD/YYYY")}
            </div>
            <div className="reservation-guests">
              Number of Guests: {reservation.numGuests}
            </div>
          </div>
          <div className="reservation-buttons">
            <div>
              <button
                onClick={() => dropdown(reservation.id)}
                className="edit-res-button"
              >
                Edit Reservation
              </button>
              <button
                onClick={() => handleDeleteReservation(reservation.id)}
                className="cancel-res-button"
              >
                Cancel Reservation
              </button>
            </div>
            {selectedReservationId === reservation.id && (
              <form
                onSubmit={handleUpdateReservation}
                className="res-edit-container"
              >
                <div className="adults-edit">
                  <div className="adults-text">Adults</div>
                  <div className="age-text">Age 13+</div>
                  <div className="ad-op-buttons">
                    <button
                      className="adult-buttons"
                      type="button"
                      value={numAdults}
                      disabled={numAdults === 1}
                      onClick={() => setNumAdults(numAdults - 1)}
                    >
                      -
                    </button>
                    <div className="edit-adult-num">{numAdults}</div>
                    <button
                      className="adult-buttons"
                      type="button"
                      value={numAdults}
                      disabled={numGuests === reservation.numGuest}
                      onClick={() => setNumAdults(numAdults + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="children-edit">
                  <div className="child-text-edit">Children</div>
                  <div className="text-2-12">2-12</div>
                  <div className="child-op-buttons">
                    <button
                      className="children-edit-buttons"
                      type="button"
                      value={numChildren}
                      disabled={numChildren === 0}
                      onClick={() => setNumChildren(numChildren - 1)}
                    >
                      -
                    </button>
                    <div className="edit-child-num">{numChildren}</div>
                    <button
                      className="children-buttons"
                      type="button"
                      value={reservation.numChildren}
                      disabled={numGuests === reservation.numGuest}
                      onClick={() => setNumChildren(numChildren + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="confirm-edit-button">Confirm</button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReservationIndex;
