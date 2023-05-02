import csrfFetch from "./csrf";

export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";
export const RECEIVE_ALL_REVIEWS = "reviews/RECEIVE_REVIEWS";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

export const receiveReview = (review) => {
  return {
    type: RECEIVE_REVIEW,
    review,
  };
};

export const receiveReviews = (reviews) => {
  return {
    type: RECEIVE_ALL_REVIEWS,
    reviews,
  };
};

export const removeReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId,
  };
};

export const getReviews = (state) =>
  state.reviews ? Object.values(state.reviews) : [];
export const getReview = (reviewId) => (state) =>
  state.reviews ? state.reviews[reviewId] : null;

export const fetchReviews = (listingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/listings/${listingId}/reviews`);
  if (res.ok) {
    let data = await res.json();
    dispatch(receiveReviews(data));
  }
};

export const fetchReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`api/reviews/${reviewId}`);
  if (res.ok) {
    let data = await res.json();
    dispatch(receiveReview(data));
  }
};

export const createReview = (reviewObj) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewObj),
  });

  if (res.ok) {
    const review = await res.json();
    dispatch(receiveReview(review));
  }
};

export const updateReview = (reviewObj) => async (dispatch) => {
  debugger;
  const res = await csrfFetch(`/api/reviews/${reviewObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewObj),
  });
  debugger;
  if (res.ok) {
    const review = await res.json();
    dispatch(receiveReview(review));
  }
  return res;
};

export const deleteReview = (reviewId) => async (dispatch) => {
  debugger;
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  debugger;
  if (res.ok) dispatch(removeReview(reviewId));
};

function reviewsReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_REVIEW:
      return (newState[action.review.id] = action.review);
    case RECEIVE_ALL_REVIEWS:
      return { ...action.reviews };
    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
}
// function reviewsReducer (state = {}, action) {
//     switch (action.type) {
//       case RECEIVE_REVIEW:
//         return {
//           ...state,
//           [action.review.id]: action.review
//         };
//       case RECEIVE_ALL_REVIEWS:
//         return { ...action.reviews };
//       case REMOVE_REVIEW:
//         const newState = { ...state };
//         delete newState[action.reviewId];
//         return newState;
//       default:
//         return state;
//     }
//   }

export default reviewsReducer;
