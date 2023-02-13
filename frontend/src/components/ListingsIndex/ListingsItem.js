import './ListingsIndex.css'

function ListingItem({ listing, handleClick }) {
    return (
      
     
      <div className="listings">
        <ul onClick={handleClick}>
        <img alt="" className="listing-pics" src={listing.photoUrls[0]}></img>
          <div>
            <p className="listing-city">
              {listing.city}, {listing.state}
            </p>
          </div>
          <div>
            <p className="listing-price">
              ${listing.nightlyPrice} night
            </p>
          </div>
        </ul>
      </div>
    );
  }

export default ListingItem;