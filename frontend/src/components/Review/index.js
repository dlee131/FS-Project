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
  const reviews = useSelector(getReviews);
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

  useEffect(() => {
    averageReviews();
  }, [reviews]);

  const averageReviews = () => {
    if (reviews.length > 0) {
      let sumCleanliness = 0,
        sumAccuracy = 0,
        sumCommunication = 0,
        sumLocation = 0,
        sumCheckIn = 0,
        sumValue = 0;

      reviews.forEach((review) => {
        sumCleanliness += review.cleanliness;
        sumAccuracy += review.accuracy;
        sumCommunication += review.communication;
        sumLocation += review.location;
        sumCheckIn += review.checkIn;
        sumValue += review.value;
      });

      setCleanliness((sumCleanliness / reviews.length).toFixed(1));
      setAccuracy((sumAccuracy / reviews.length).toFixed(1));
      setCommunication((sumCommunication / reviews.length).toFixed(1));
      setLocation((sumLocation / reviews.length).toFixed(1));
      setCheckIn((sumCheckIn / reviews.length).toFixed(1));
      setValue((sumValue / reviews.length).toFixed(1));
    } else {
      setCleanliness("NA");
      setAccuracy("NA");
      setCommunication("NA");
      setLocation("NA");
      setCheckIn("NA");
      setValue("NA");
    }
  };

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

  function calculateAverageRating(reviews) {
    if (reviews.length === 0) {
        return "NA";
      }
    
    let totalSum = 0;

    reviews.forEach((review) => {
      const { cleanliness, communication, checkIn, accuracy, location, value } =
        review;

      const avgRating =
        (cleanliness + communication + checkIn + accuracy + location + value) /
        6;
      totalSum += avgRating;
    });
    const overallAvgRating = (totalSum / reviews.length).toFixed(2);
    return overallAvgRating;
  }

  const reviewCategories = [
    { title: "Cleanliness", value: cleanliness },
    { title: "Accuracy", value: accuracy },
    { title: "Communication", value: communication },
    { title: "Location", value: location },
    { title: "Check-in", value: checkIn },
    { title: "Value", value: value },
  ];

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
        {calculateAverageRating(reviews)} · {totalReviews}{" "}
        {totalReviews === 1 ? "review" : "reviews"}
      </div>
      <div>
        <NavLink exact to={`/listings/${listingId}/reviews/new`}>
          Write a review!
        </NavLink>
        <div className="reviews-figure">
          {reviewCategories.map((category) => (
            <div className="category" key={category.title}>
              <p>{category.title}</p>
              <div className="progress-div">
                <progress value={category.value} max="5"></progress>
                <p>{(category.value)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {reviewList}
    </div>
  );
}

export default ReviewsIndex;
