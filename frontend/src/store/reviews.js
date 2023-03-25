import csrfFetch from "./csrf";

export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW"
export const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS"
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW"

export const receiveReview = (review) => {
    return {
        type: RECEIVE_REVIEW,
        review
    }
}

export const receiveReviews = (reviews) => {
    return {
        type: RECEIVE_REVIEWS,
        reviews
    }
}

export const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}

export const getReviews = (state) => {
    return state.reviews ? Object.values(state.reviews) : []
}

export const fetchReviews = () => async dispatch => {
    const res = await csrfFetch(`api/reviews`)
    if (res.ok) {
        let data = await res.json()
        dispatch(receiveReviews(data))
    }
}

export const fetchReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`api/reviews/${reviewId}`)
    if (res.ok) {
        let data = await res.json()
        dispatch(receiveReview(data))
    }
}

