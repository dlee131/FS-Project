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
      <div class="input-group">
        <div class="form-outline">
          <input id="search-focus" type="search" class="form-control" />
          <label class="form-label" for="form1">Search</label>
        </div>
        <button type="button" class="searchbutton">
            <i class="fas fa-search"></i>
        </button>
      </div>
    )
}

export default SearchBar;