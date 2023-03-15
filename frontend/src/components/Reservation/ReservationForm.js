import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../store/reservations";
import "./ReservationForm.css";
// import { DateRangePicker} from 'react-datepicker'

function ReservationForm() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const history = useHistory();
  const [toggledDropDown, setToggledDropDown] = useState(false);
  const [errors, setErrors] = useState();
  // const history = useHistory();
  // const { numGuest, nightlyPrice } = listing;
  // destructuring
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const user = useSelector((state) => state.session.user);

  const userId = user?.id || null;

//   const [reservation, setReservation] = useState({
//     startDate,
//     endDate,
//     numGuests,
//     listingId,
//     userId
//   });

  const reservation = {
    reservation: {
      listingId,
      userId,
      startDate,
      endDate,
      numGuests
    },
  };

  const dropdown = () => {
    if (toggledDropDown) {
      return setToggledDropDown(false);
    } else {
      return setToggledDropDown(true);
    }
  };

//   const handleAddSubtractGuest = (operation) => {
//     return (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       if (operation.toLowerCase() === 'add') {
//         if (reservation.numGuests < numGuest) {
//           setReservationInfo({...reservationInfo, numGuests: reservationInfo.numGuests + 1})
//         }
//       } else {
//         if (reservationInfo.numGuests > 1) {
//           setReservationInfo({...reservationInfo, numGuests: reservationInfo.numGuests - 1})
//         }
//       }
//     }
//   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

  
    return dispatch(createReservation(reservation))
      .then(() => {
        history.push("/reservations");
      })
      .catch(async (res) => {
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
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="res-header">
          <div className="price">${listing.nightlyPrice} night</div>
          <span>
            <i className="fa fa-star "></i>
            {listing.ratings}
          </span>
        </div>
        <div className="reservation-form-wrapper">
          <div className="form-input">
            <div className="date-title">
            <label className="check-in-date">CHECK-IN</label>
            </div>
              <input
                id="reservation-inputs"
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={moment().add(1, "day").format("YYYY-MM-DD")}
                required
              />
              <div className="date-title">
              <label className="check-out-date">CHECKOUT</label>
              </div> 
              <input
                id="reservation-inputs"
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                required
                min={
                  startDate
                    ? moment(startDate, "YYYY-MM-DD")
                        .add(1, "days")
                        .format("YYYY-MM-DD")
                    : moment().add(1, "days").format("YYYY-MM-DD")
                }
              />

            </div>
        <div className="guests-container" onClick={dropdown}><div>
              <h4 className="guests">GUESTS</h4>
              <div>{numGuests}</div>
            </div>
            </div>
      </div>
      <button className="reserve-button">
        <div>Check availability</div>
      </button>
    </form>
  );
}

export default ReservationForm;
