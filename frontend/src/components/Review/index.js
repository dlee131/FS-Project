import { useState, useEffect } from "react";
import { getReviews, fetchReviews } from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { deleteReview, updateReview } from "../../store/reviews";

function ReviewsIndex() {

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

  useEffect(() => {
    dispatch(fetchReviews(listingId));
  }, [listingId, dispatch]);

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
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
)
}

export default ReviewsIndex;
