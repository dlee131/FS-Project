import { useState, useEffect } from "react";
import { getReviews, fetchReviews } from "../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";


function ReviewsIndex() {
  const [cleanliness, setCleanliness] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [location, setLocation] = useState(0);
  const [checkIn, setCheckIn] = useState(0);
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const reviews = useSelector(getReviews);
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const { reviewId } = useParams();
  const review = useSelector((state) => state.reviews[reviewId]);
  const totalReviews = reviews.length;
  const userId = useParams();


  useEffect(() => {
    dispatch(fetchReviews(listingId));
  }, [listingId, dispatch]);

//  const EachReview = reviews.forEach(review => {
//         review.comment
//   })

const eachReview = reviews.map(review => {
    // Access each review using the `review` variable
    return (
      <div key={review.id}>
        <p>{review.comment}</p>
        <p>{review.reviewerName}</p>
      </div>
    );
  });
  
  return (
    <div className="reviews-index">
    <div className="total-reviews">
      <i className="fas fa-star"></i>{totalReviews} {totalReviews === 1 ? "review" : "reviews"}
    </div>
    <div>
        <NavLink exact to={`/listings/${listingId}/reviews/new`}>Write a review!</NavLink>
    </div>
        {eachReview}
    </div>
  );
}

export default ReviewsIndex;
