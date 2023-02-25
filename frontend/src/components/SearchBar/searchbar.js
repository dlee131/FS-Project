import './searchbar.css'


function SearchBar () {

const searchFocus = document.getElementById('search-focus');
const keys = [
  { keyCode: 'AltLeft', isTriggered: false },
  { keyCode: 'ControlLeft', isTriggered: false },
];

window.addEventListener('keydown', (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = true;
    }
  });

  const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

  if (shortcutTriggered) {
    searchFocus.focus();
  }
});

window.addEventListener('keyup', (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = false;
    }
  });
});
    return (
      <div className="input-group">
        <div className="form-outline">
          <input id="search-focus" type="search" className="form-control" />
          <label className="form-label" for="form1">Search</label>
        </div>
        <button type="button" className="searchbutton">
            <i className="fas fa-search"></i>
        </button>
      </div>
    )
}

export default SearchBar;