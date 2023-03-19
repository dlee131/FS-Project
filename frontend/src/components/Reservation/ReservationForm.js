import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../store/reservations";
// import LoginFormModal from "../LoginFormModal";
import "./ReservationForm.css";

function ReservationForm() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const history = useHistory();
  const [DropDown, setDropDown] = useState(false);
  // const [showModal, setShowModal] = useState(false);
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
    }
  };

  useEffect(() => {
    setNumGuests(numGuests)
}, [numGuests])

  const dropdown = (e) => {
    e.preventDefault();
    setDropDown(!DropDown);
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
    // if (!user) {
    //   LoginFormModal(showModal);
    // }
  
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

  
  const calculateEachCost = () => {
    if (startDate && endDate) {
      const nights = moment(endDate).diff(moment(startDate), "days");
      const subtotal = nights * listing.nightlyPrice;
      const cleaningFee = subtotal * 0.05; // calculate the cleaning fee
      return subtotal + cleaningFee;
    } else {
      return listing.nightlyPrice;
    }
  };
  
  const calculateTotalBeforeTax = () => {
    const subtotal = calculateEachCost();
    const cleaningFee = subtotal * 0.05;
    const airbnbServiceFee = subtotal * 0.1;
    return subtotal + cleaningFee + airbnbServiceFee;
  }

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
                id="reservation-input"
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
        <div className="border-line"></div>
            </div>
        <div className="guests-container" onClick={dropdown}>
              <div className="guests">GUESTS</div>
              <div className="num-guests">{numGuests} guest</div>
              <div className="chevron">
              {!DropDown ? <i className="fa-sharp fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
              </div>
        {DropDown && (
                <div className="dropdown-reservation" style={{ zIndex: 1 }}>
                  Adults
        </div>)}
        </div>
      </div>
      <button className="reserve-button">
        <div className="availability">Reserve</div>
      </button>
      <div className="total-cost">
        ${listing.nightlyPrice} x {" "}
        {startDate && endDate
          ? moment(endDate).diff(moment(startDate), "days")
          : "1"}{" "}
        nights
      </div>
      <div className="calculateNightlyCost">${calculateEachCost().toFixed()}</div>
      <div className="cleaning-fee">Cleaning fee</div>
      <div className="calculateCleaningFee">${(calculateEachCost() * 0.05).toFixed()}</div>
      <div className="airbnb-service-fee">Airbnb service fee</div>
      <div className="calculateAirbnbServiceFee">${(calculateEachCost() * 0.1).toFixed()}</div>
      <div className="borderline2"></div>
      <div className="total-before-tax"> Total before taxes </div>
      <div className="calculateTotal">${calculateTotalBeforeTax().toFixed()}</div>
    </form>
  );
}

export default ReservationForm;
