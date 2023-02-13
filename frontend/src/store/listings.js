import csrfFetch from "./csrf";

const RECEIVE_LISTINGS = 'listings/receiveListings' 
const RECEIVE_LISTING = 'listings/receiveListing'

export const receiveListings = listings => {
    return { 
        type: RECEIVE_LISTINGS,
        listings
    };
};

export const receiveListing = listing => {
    return {
        type: RECEIVE_LISTING,
        listing
    };
};

export const getListings = (state) => state.listings ? Object.values(state.listings) : [];
export const getListing = (listingId) => (state) => state.listings ? state.listings[listingId] : null


export const fetchListings = () => async dispatch => {
    const response = await csrfFetch(`/api/listings`)
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