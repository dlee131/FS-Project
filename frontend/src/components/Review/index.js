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
  const totalReviews = reviews.length;

  useEffect(() => {
    dispatch(fetchReviews(listingId));
  }, [listingId, dispatch]);

  return (
    <div className="reviews-index">
    <div className="total-reviews">
      <i className="fas fa-star"></i>{totalReviews} {totalReviews === 1 ? "reviews" : "reviews"}
    </div>
    <div>
        <NavLink exact to={`/listings/${listingId}/reviews/new`}>Write a review!</NavLink>
    </div>
    </div>
  );
}

export default ReviewsIndex;
