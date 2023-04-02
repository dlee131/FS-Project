import { useState, useEffect } from "react";
import { getReviews, fetchReviews } from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { deleteReview } from "../../store/reviews";

function ReviewsIndex() {
    const [comment, setComment] = useState("");
    const reviews = useSelector(getReviews);
    const dispatch = useDispatch();
    const { listingId } = useParams();
    const totalReviews = reviews.length;
  
    useEffect(() => {
      dispatch(fetchReviews(listingId));
    }, [listingId, dispatch]);
  
    const handleDeleteReview = (reviewId) => {
      dispatch(deleteReview(reviewId));
    };
  
    const formatDate = (date) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    };
  
    const reviewList = reviews.map((review) => (
      <div key={review.id}>
        <p>{review.reviewerName}</p>
        <p>{formatDate(review.createdAt)}</p>
        <p>{review.comment}</p>
        <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
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
