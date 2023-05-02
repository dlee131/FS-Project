import csrfFetch from "./csrf";

const RECEIVE_LISTINGS = "listings/receiveListings";
const RECEIVE_LISTING = "listings/receiveListing";

export const receiveListings = (listings) => {
  return {
    type: RECEIVE_LISTINGS,
    listings,
  };
};

export const receiveListing = (listing) => {
  return {
    type: RECEIVE_LISTING,
    listing,
  };
};

export const getListings = (state) =>
  state.listings ? Object.values(state.listings) : [];
export const getListing = (listingId) => (state) =>
  state.listings ? state.listings[listingId] : null;

export const fetchListings =
  (search = "") =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/listings`);
    if (response.ok) {
      const listings = await response.json();
      const filteredListings = Object.keys(listings).reduce((filtered, key) => {
        if (
          listings[key].state.toLowerCase().includes(search.toLowerCase()) ||
          listings[key].city.toLowerCase().includes(search.toLowerCase())
        ) {
          filtered[key] = listings[key];
        }

        return filtered;
      }, {});
      dispatch(receiveListings(filteredListings));
    }
  };

export const fetchListingsType = (filters) => async (dispatch) => {
  const res = await csrfFetch(`/api/listings/filter/${filters}`);

  let data = await res.json();
  dispatch(receiveListings(data));
};

export const fetchListing = (listingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/listings/${listingId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveListing(data));
  }
};

function listingsReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return { ...action.listings };
    case RECEIVE_LISTING:
      debugger;
      return (newState[action.listing.id] = action.listing);
    default:
      return state;
  }
}

export default listingsReducer;
