import csrfFetch from "./csrf";

const RECEIVE_LISTINGS = 'listings/receiveListings' 
const RECEIVE_LISTING = 'listings/receiveListing'

const receiveListings = listings => {
    return { 
        type: RECEIVE_LISTINGS,
        listings
    };
};

const receiveListing = listing => {
    return {
        type: RECEIVE_LISTING,
        listing
    };
};

export const fetchListings = (filters) => async dispatch => {
    const filter = new URLSearchParams(filters);
    const response = await csrfFetch(`/api/listings?${filter}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveListings(data))
    };
};

export const fetchListing = (listingId) => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveListing(data))
    };
};

function listingsReducer(state = {}, action) {
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_LISTINGS:
            return { ...state, ...action.listings}
        case RECEIVE_LISTING:
            return newState[action.listing.id] = action.listing
        default:
            return state;
    };
};

export default listingsReducer;