import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";
import { updateSearch } from "../../store/search";
import "./searchbar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);


  const handleSearch = () => {
    setLoading(true);
    dispatch(fetchListings({ city: searchQuery })).finally(() => {
      setLoading(false);
      setListings(prevListings => prevListings.filter(listing => listing.city === searchQuery));
    });
  };

  const handleKeyDown = (e) => { 
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="input-group">
      <div className="form-outline">
        <input
          id="search-focus"
          type="search"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search Your Destination"
        />
      </div>
      <button type="button" className="searchbutton" onClick={handleSearch}>
        {loading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <i className="fas fa-search"></i>
        )}
      </button>
    </div>
  );
}

export default SearchBar;
