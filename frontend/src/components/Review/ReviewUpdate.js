import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import { updateReview } from "../../store/reviews";


function ReviewUpdate() {
    const [cleanliness, setCleanliness] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [communication, setCommunication] = useState(0);
    const [location, setLocation] = useState(0);
    const [checkIn, setCheckIn] = useState(0);
    const [value, setValue] = useState(0);
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    const { listingId } = useParams();
    const userId = useSelector((state) => state.session.user.id);
    const dispatch = useDispatch();
    const history = useHistory();
    const reviews = useSelector(getReviews);
    // const totalReviews = reviews.length;
    // const user = useSelector((state) => state.session.user);
    const { reviewId } = useParams();
    const review = useSelector((state) => state.reviews[reviewId]);

    const userReviews = reviews.filter((review) => review.userId === userId);


    const handleUpdateReview = (e) => {
        e.preventDefault();
      
        const newReview = {
          id: review.id,
          listing_id: review.listingId,
          user_id: userId,
          comment,
          cleanliness,
          accuracy,
          location,
          value,
          communication,
          check_in: checkIn,
        };
      
        dispatch(updateReview(newReview))
          .then(() => {
            history.push(`/listings/${listingId}`);
          })
          .catch((err) => {
            console.error(err);
            setErrors(["Failed to update review. Please try again."]);
          });
      };
  
    function Slider({ label, value, min, max, onChange }) {
      const handleOnChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue);
      };
  
      return (
        <div>
          <label>
            {label}: {value}
          </label>
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleOnChange}
          />
        </div>
      );
    }
  
    return (
      <form onSubmit={handleUpdateReview}>
        <div>Describe your stay and experience at this place!</div>
  
        <Slider
          label="Cleanliness"
          value={cleanliness}
          min={0}
          max={5}
          onChange={(newValue) => setCleanliness(newValue)}
        />
        <Slider
          label="Accuracy"
          value={accuracy}
          min={0}
          max={5}
          onChange={(newValue) => setAccuracy(newValue)}
        />
        <Slider
          label="Communication"
          value={communication}
          min={0}
          max={5}
          onChange={(newValue) => setCommunication(newValue)}
        />
        <Slider
          label="Location"
          value={location}
          min={0}
          max={5}
          onChange={(newValue) => setLocation(newValue)}
        />
        <Slider
          label="Check-in"
          value={checkIn}
          min={0}
          max={5}
          onChange={(newValue) => setCheckIn(newValue)}
        />
        <Slider
          label="Value"
          value={value}
          min={0}
          max={5}
          onChange={(newValue) => setValue(newValue)}
        />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    );
  }

export default ReviewUpdate;