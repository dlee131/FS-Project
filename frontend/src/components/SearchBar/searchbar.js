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
  console.log(setSearchResults)
  
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
      <button type="button" className="searchbutton" onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBar;
