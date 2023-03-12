import './ListingsIndex.css'

function ListingItem({ listing, handleClick }) {


    return (
      
     <>
      <div className="listings">
        <ul onClick={handleClick}>
        <img alt="" className="listing-pics" src={listing.photo[0]}></img>
          <div>
            <div className="listing-city">
              {listing.city}, {listing.state}
              <div className="fa fa-star" id="star-icon">{listing.ratings}</div>
            </div>
            
          <div className="listing-index-title">
            {listing.title.length < 30 ? listing.title : `${listing.title.slice(0, 30)}...`}
          </div>
          </div>
          <div className="listing-index-title">{listing.numBeds > 1 ? `${listing.numBeds} beds` : `${listing.numBeds} bed`}</div>
          <div>
            <p className="listing-price">
              <a className="numeric">${listing.nightlyPrice}</a> night
            </p>
          </div>
        </ul>
      </div>
    </>
    );
  }

export default ListingItem;