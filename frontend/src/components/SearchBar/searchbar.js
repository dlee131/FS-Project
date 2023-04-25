import { useState } from "react";
import { useDispatch } from "react-redux";
import { getListings } from "../../store/listings";
import { updateSearch } from "../../store/search";
import { useSelector } from "react-redux";
import "./searchbar.css";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [SearchResults, setSearchResults] = useState("");
  const listings = useSelector(getListings);

  function handleSearch() {
    const filteredListings = listings.filter(
      (listing) => listing.state.toLowerCase() === searchQuery.toLowerCase()
    );
    setSearchResults(filteredListings);
  }
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
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
      <button type="button" className="search-button" onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBar;
