import { useState, useEffect } from "react";
import { getReviews, fetchReviews } from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { deleteReview, updateReview } from "../../store/reviews";

function ReviewsIndex() {
  const [cleanliness, setCleanliness] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [location, setLocation] = useState(0);
  const [checkIn, setCheckIn] = useState(0);
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const reviews = useSelector(getReviews);
  const [selectedReviewId, setSelectedReviewId] = useState(false);
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const totalReviews = reviews.length;
  const user = useSelector((state) => state.session.user);
  const userId = user?.id || null;
  const { reviewId } = useParams();
  const review = useSelector((state) => state.reviews[reviewId]);
  const history = useHistory();
  const [editingReview, setEditingReview] = useState(false);


  const userReviews = reviews.filter((review) => review.userId === userId);

  useEffect(() => {
    dispatch(fetchReviews(listingId));
  }, [listingId, dispatch]);

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
  };

  const handleUpdateReview = (reviewId) => {
    const reviewToUpdate = userReviews.find((review) => review.id === reviewId);
    if (reviewToUpdate) {
      const newReview = {
        id: reviewToUpdate.id,
        listing_id: reviewToUpdate.listingId,
        user_id: reviewToUpdate.userId,
        comment,
        cleanliness,
        accuracy,
        location,
        value,
        communication,
        check_in: checkIn,
      };

      dispatch(updateReview(newReview))
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
        })
        .then(() => {
          history.push(`/listings/${listingId}`);
        });
    }
  };
  
  const handleEditReview = (reviewId) => {
    history.push(`/listings/${listingId}/reviews/${reviewId}/edit`);
  };

  const formatDate = (stringTime) => {
    const date = new Date(stringTime);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${month} ${year}`;
  };

  const reviewList = reviews.map((review) => (
    <div key={review.id}>
      <p>{review.reviewerName}</p>
      <p>{formatDate(review.reviewer)}</p>
      <p>{review.comment}</p>
      {review.userId === userId && (
        <div>
          <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
          <button onClick={() => handleEditReview(review.id)}>Edit</button>
        </div>
      )}
    </div>
  ));


  return (
    <div className="reviews-index">
      {editingReview ? (
        <form onSubmit={() => handleUpdateReview(selectedReviewId)}>
          <div className="form-group">
            <label htmlFor="cleanliness">Cleanliness:</label>
            <input
              type="number"
              id="cleanliness"
              name="cleanliness"
              value={cleanliness}
              onChange={(e) => setCleanliness(e.target.value)}
              min="0"
              max="5"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="accuracy">Accuracy:</label>
            <input
              type="number"
              id="accuracy"
              name="accuracy"
              value={accuracy}
              onChange={(e) => setAccuracy(e.target.value)}
              min="0"
              max="5"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="communication">Communication:</label>
            <input
              type="number"
              id="communication"
              name="communication"
              value={communication}
              onChange={(e) => setCommunication(e.target.value)}
              min="0"
              max="5"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="number"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              min="0"
              max="5"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="checkIn">Check In:</label>
            <input
              type="number"
              id="checkIn"
              name="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min="0"
              max="5"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value:</label>
            <input
              type="number"
              id="value"
              name="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min="0"
              max="5"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Update Review</button>
            <button type="button" onClick={() => setEditingReview(false)}>
              Cancel
            </button>
            
          </div>
          <button type="submit">Update</button>
      </form>
      ) : (
        <div>
          <div className="total-reviews">
            <i className="fas fa-star"></i>
            {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </div>
          <div>
            <NavLink exact to={`/listings/${listingId}/reviews/new`}>
              Write a review!
            </NavLink>
          </div>
          {reviewList}
        </div>
      )}
    </div>
  );

}

export default ReviewsIndex;
