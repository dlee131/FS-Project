import "./searchbar.css";

function SearchBar({ search, setSearch }) {
  return (
    <div className="input-group">
      <div className="form-outline">
        <input
          id="search-focus"
          type="search"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Your Destination"
        />
      </div>
    </div>
  );
}

export default SearchBar;
