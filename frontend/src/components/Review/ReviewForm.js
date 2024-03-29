import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import "./ReviewForm.css";

function ReviewForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const intListingId = listingId;
    const reviewParams = {
      listing_id: intListingId,
      user_id: userId,
      cleanliness,
      accuracy,
      communication,
      location,
      check_in: checkIn,
      value,
      comment,
    };

    dispatch(createReview(reviewParams))
      .then(() => {
        history.push(`/listings/${listingId}`);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors(["Try again."]);
        }
      });
  };

  function StarRatings({ label, value, min, max, onChange }) {
    const [hoveredStarIndex, setHoveredStarIndex] = useState(null);

    const handleOnChange = (newValue) => {
      onChange(newValue);
    };

    const handleOnStarEnter = (starIndex) => {
      setHoveredStarIndex(starIndex);
    };

    const handleOnStarLeave = () => {
      setHoveredStarIndex(null);
    };

    const stars = [];
    for (let i = 1; i <= max; i++) {
      const isActive = i <= value;
      const isHovered = i <= hoveredStarIndex;
      const starClassName = `fas fa-star${isActive ? " active highlight" : ""}${
        isHovered ? " hover highlight" : ""
      }`;

      stars.push(
        <i
          key={i}
          className={starClassName}
          onClick={() => handleOnChange(i)}
          onMouseEnter={() => handleOnStarEnter(i)}
          onMouseLeave={() => handleOnStarLeave()}
        ></i>
      );
    }

    return (
      <div className="star-ratings">
        <label>
          {label}: {value}
        </label>
        <div className="star-rating">{stars}</div>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-header">
        Describe your stay and experience at this place!
      </div>
      <div className="border-line2"></div>
      <div className="ratings">
        <StarRatings
          label="Cleanliness"
          value={cleanliness}
          min={0}
          max={5}
          onChange={(newValue) => setCleanliness(newValue)}
          className="cleanliness-slider"
        />
        <StarRatings
          label="Accuracy"
          value={accuracy}
          min={0}
          max={5}
          onChange={(newValue) => setAccuracy(newValue)}
        />
        <StarRatings
          label="Communication"
          value={communication}
          min={0}
          max={5}
          onChange={(newValue) => setCommunication(newValue)}
        />
        <StarRatings
          label="Location"
          value={location}
          min={0}
          max={5}
          onChange={(newValue) => setLocation(newValue)}
        />
        <StarRatings
          label="Check-in"
          value={checkIn}
          min={0}
          max={5}
          onChange={(newValue) => setCheckIn(newValue)}
        />
        <StarRatings
          label="Value"
          value={value}
          min={0}
          max={5}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
      <label className="review-comment">
        <div className="review-comment-text">Describe your experience</div>
        <textarea
          className="comment-area"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a review"
        />
      </label>
      <button className="review-button">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
