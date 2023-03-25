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
  const [errors, setErrors] = useState();
  const [selectedReservationId, setSelectedReservationId] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user?.id || null;

  // Filter reservations by user ID
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

  const handleDeleteReservation = (reservationId) => {
    dispatch(deleteReservation(reservationId));
    // debugger
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
        listing_id: reservationToUpdate.listingId,
        id: reservationToUpdate.id,
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
        num_guests: numGuests,
      };
      dispatch(updateReservation(updatedReservation)).catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
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
            <img
              src={reservation.photo[0]}
              alt=""
              className="reservation-photo"
              onClick={() => handleClick(reservation.listingId, reservation.id)}
            />
          </div>
          <div className="reservation-description">
            <div className="reservation-city">{reservation.state}</div>
            <div className="reservation-residence">
              Entire {reservation.residenceType} hosted by{" "}
              {reservation.userName}
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
            <button
              onClick={() => handleDeleteReservation(reservation.id)}
              className="cancel-button"
            >
              Cancel Reservation
            </button>
            <button onClick={() => dropdown(reservation.id)}>
              Edit reservation
            </button>
            {selectedReservationId === reservation.id && (
              <form onSubmit={handleUpdateReservation}>
                <div>Adults</div>
                <div>Age 13+</div>
                <button
                  type="button"
                  value={numAdults}
                  disabled={numAdults === 1}
                  onClick={() => setNumAdults(numAdults - 1)}
                >
                  -
                </button>
                <div>{numAdults}</div>
                <button
                  type="button"
                  value={numAdults}
                  disabled={numGuests === 4}
                  onClick={() => setNumAdults(numAdults + 1)}
                >
                  +
                </button>
                <div>Children</div>
                <div>2-12</div>
                <button
                  type="button"
                  value={numChildren}
                  disabled={numChildren === 0}
                  onClick={() => setNumChildren(numChildren - 1)}
                >
                  -
                </button>
                <div>{numChildren}</div>
                <button
                  type="button"
                  value={reservation.numChildren}
                  disabled={numGuests === 4}
                  onClick={() => setNumChildren(numChildren + 1)}
                >
                  +
                </button>
                <input
                  id="reservation-inputs"
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={moment().add(1, "day").format("YYYY-MM-DD")}
                />
                <input
                  id="reservation-input"
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                  min={
                    startDate
                      ? moment(startDate, "YYYY-MM-DD")
                          .add(1, "days")
                          .format("YYYY-MM-DD")
                      : moment().add(1, "days").format("YYYY-MM-DD")
                  }
                />
                <button>Confirm</button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReservationIndex;
