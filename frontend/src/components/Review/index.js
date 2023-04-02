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
  
    const userReviews = reviews.filter(
      (review) => review.userId === user.id
    );
  
    useEffect(() => {
      dispatch(fetchReviews(listingId));
    }, [listingId, dispatch]);
  
    const handleDeleteReview = (reviewId) => {
      dispatch(deleteReview(reviewId));
    };
  
    const handleUpdateReview = (reviewId) => {
        const reviewToUpdate = userReviews.find(
          (review) => review.id === reviewId
        );
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
  );

  
}

export default ReviewsIndex;
