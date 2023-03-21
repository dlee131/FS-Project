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
  const [numGuests, setNumGuests] = useState();
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const history = useHistory();
  const [dropDown, setDropDown] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const user = useSelector((state) => state.session.user);

  const userId = user?.id || null;

  const reservation = {
    reservation: {
      listingId,
      userId,
      startDate,
      endDate,
      numGuests,
    },
  };

  useEffect(() => {
    setNumGuests(numAdults + numChildren);
  }, [numAdults, numChildren]);

  const dropdown = (e) => {
    e.preventDefault();
    setDropDown(!dropDown);
  };
  

  const calculateCleaningFee = (subtotal) => {
    return subtotal * 0.01;
  };

  const calculateEachCost = () => {
    if (startDate && endDate) {
      const nights = moment(endDate).diff(moment(startDate), "days");
      const subtotal = nights * listing.nightlyPrice;
      const cleaningFee = calculateCleaningFee(subtotal);
      return subtotal + cleaningFee;
    } else {
      return listing.nightlyPrice;
    }
  };

  const calculateTotalBeforeTax = () => {
    const subtotal = calculateEachCost();
    const cleaningFee = calculateCleaningFee(subtotal);
    const airbnbServiceFee = subtotal * 0.1;
    return subtotal + cleaningFee + airbnbServiceFee;
  };

  // const handlePlusButton = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setNumAdults(numAdults + 1)
  // };

  // const handleMinusButton = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setNumAdults(numAdults - 1)
  // };

  const handleNumAdultsChange = (e, operation) => {
    e.preventDefault();
    e.stopPropagation();
    if (operation === 'increment') {
      setNumAdults(numAdults + 1);
    } else if (operation === 'decrement') {
      setNumAdults(numAdults - 1);
    }
  };

  const handleNumChildrenChange = (e, operation) => {
    e.preventDefault();
    e.stopPropagation();
    if (operation === 'increment') {
      setNumChildren(numChildren + 1);
    } else if (operation === 'decrement') {
      setNumChildren(numChildren - 1);
    }
  };

//   const handleNumChange = (e, operation, type) => {
//   e.preventDefault();
//   e.stopPropagation();
//   if (type === 'adults') {
//     if (operation === 'increment') {
//       setNumAdults(numAdults + 1);
//     } else if (operation === 'decrement') {
//       setNumAdults(numAdults - 1);
//     }
//   } else if (type === 'children') {
//     if (operation === 'increment') {
//       setNumChildren(numChildren + 1);
//     } else if (operation === 'decrement') {
//       setNumChildren(numChildren - 1);
//     }
//   }
// };
  // const handleCloseContainer = (e) => {
  //   if (e.target === null || (e.target.className != "guests-container")) {
  //     setDropDown(!dropDown);
  //   }
  // };

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


  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="res-header">
        <div className="price">${listing.nightlyPrice}</div>
        <div className="price-night">night</div>
        <span className="res-rating">
          <i className="fa fa-star"></i>
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
        {/* onClick={() => setIsOpen(!isOpen)} */}
        <div className="guests-container" onClick={dropdown}>
          <div className="guests">GUESTS</div>
          <div className="num-guests">{numGuests} guest</div>
          <div className="chevron">
            {!dropDown ? (
              <i className="fa-sharp fa-solid fa-chevron-down"></i>
            ) : (
              <i className="fa-solid fa-chevron-up"></i>
            )}
          </div>
          {dropDown && (
            <div className="dropdown-reservation">
              <div className="guests-labels">
              <div className="guest-label">Adults</div>
              <div className="ages">Age 13+</div>
              <div className="guest-label">Children</div>
              <div className="ages">Ages 2-12</div>
              </div>
              <div className="adult-button">
              <button className="adult-buttons" disabled={numAdults === 1} onClick={(e) => handleNumAdultsChange(e, 'decrement')}>-</button>
                <div>{numAdults}</div>
              <button className="adult-buttons"disabled={numGuests === 4} onClick={(e) => handleNumAdultsChange(e, 'increment')}>+</button>
              </div>
              <div className="children-button">
              <button className="children-buttons" disabled={numChildren < 1} onClick={(e) => handleNumChildrenChange(e, 'decrement')}>-</button>
                <div>{numChildren}</div>
                <button className="children-buttons" disabled={numGuests === 4} onClick={(e) => handleNumChildrenChange(e, 'increment')}>+</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <button className="reserve-button">
        <div className="availability">Reserve</div>
      </button>
      <div className="total-cost">
        ${listing.nightlyPrice} x{" "}
        {startDate && endDate
          ? moment(endDate).diff(moment(startDate), "days")
          : "1"}{" "}
        nights
      </div>
      <div className="calculateNightlyCost">
        ${calculateEachCost().toFixed()}
      </div>
      <div className="cleaning-fee">Cleaning fee</div>
      <div className="calculateCleaningFee">
        ${(calculateEachCost() * 0.05).toFixed()}
      </div>
      <div className="airbnb-service-fee">Airbnb service fee</div>
      <div className="calculateAirbnbServiceFee">
        ${(calculateEachCost() * 0.1).toFixed()}
      </div>
      <div className="borderline2"></div>
      <div className="total-before-tax"> Total before taxes </div>
      <div className="calculateTotal">
        ${calculateTotalBeforeTax().toFixed()}
      </div>
    </form>
  );
}

export default ReservationForm;
