import './ListingsIndex.css'
import { getReviews } from "../../store/reviews";
import { calculateAverageRating } from "../Review";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function ListingItem({ listing, handleClick }) {

  const reviews = useSelector(getReviews);
  const { reviewId } = useParams();


  return (

      <div className="listings">
        <ul>
          <img alt="" className="listing-pics" src={listing.photo[0]} onClick={handleClick}></img>
          <div>
            <div className="listing-city">
              {listing.city}, {listing.state}
              <div className="fa fa-star" id="star-icon">{listing.avgRating}</div>
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
  );
}


export default ListingItem;