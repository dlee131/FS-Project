import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchListings, getListings } from "../../store/listings"
import { useParams } from 'react-router-dom'
import './ListingPage.css'
import ReservationForm from "../Reservation/ReservationForm";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faStar } from '@fortawesome/free-solid-svg-icons';
// import  ListingsItem  from './ListingsItem';
// import { useHistory } from "react-router-dom"
// library.add(faStar);

export const ListingPage = () => {
    const dispatch = useDispatch();
    // const listings = useSelector(getListings)
    const { listingId } = useParams();
    const listing = useSelector(state => state.listings[listingId])

    
    useEffect(() => {
        dispatch(fetchListings(listingId))
      },[listingId, dispatch])

    if (!listing) {
        return <div>Loading...</div>;
    }

    return (
         <div className="listing-indiv-page">
            <header>
                <div className="listing-indiv-header">
                    <div className="listing-title">
                        {listing.title}
                    </div>
                    <div className="listing-location">
                        <i className="fas fa-star"></i> {listing.ratings} • <i className="fa-sharp fa-solid fa-medal"></i><span className="superhost">Superhost</span> • {listing.city}, {listing.state}, {listing.country} 
                        <i className="fa-sharp fa-solid fa-arrow-up-from-bracket"></i><span className="share">Share</span> 
                        <i className="fa-sharp fa-regular fa-heart"></i><span className="save">Save</span>
                    </div>
                    
                    
                </div>
                <div className="listing-images">
                    <div className="listing-images-grid">
                            <div className="col2 row2"><img src={listing.photo[0]} alt="" /></div>
                            <div className="image-container"><img src={listing.photo[1]} alt="" /></div>
                            <div className="image-container"><img src={listing.photo[2]} alt="" /></div>
                            <div className="image-container"><img src={listing.photo[3]} alt="" /></div>
                            <div className="image-container"><img src={listing.photo[4]} alt="" /></div>
                    </div>
                </div>
            </header>
            <div className="info-container">
                <div className="listing-info">
                    <h1 className="residence-type">{`${listing.residenceType} hosted by ${listing.userName}`}</h1>
                    <h2 className="listing-bed">{listing.numBedrooms} bedroom • {listing.numBeds} beds • {listing.numBathrooms} baths</h2> 
                        <div className="borderline"></div>
                    <div className="requirements-margin">
                        <div className="requirements"><i className="fa-solid fa-door-open"></i> Self check-in</div>
                        <div className="requirement">Check yourself in with a smartlock.</div>
                        <div className="requirements"><i className="fa-sharp fa-solid fa-medal"></i>{listing.userName} is a Superhost.</div>
                        <div className="requirement">Superhosts are highly rated hosts who are committed to providing great stays for guests.</div>
                    </div>
                    <div className="borderline"></div>
                    <div className="aircover-logo"><span className="air-logo">air</span>cover</div>
                    <div className="aircover-text"> Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                    </div>
                    <div className="borderline"></div>
                    <div className="description"> {listing.description} </div>
                    <div className="borderline"></div>
                <div className="amenities-container">
                    <h4 className="amenities-header">What this place offers</h4>
                    <div id="amenities-icons"></div>
                    <div id="amenities-icon"><img src='https://melobnb-seeds.s3.amazonaws.com/kitchen.png' alt="design-icon" />
                        <div className="amenities-text">Kitchen</div>
                    </div>
                    <div id="amenities-icon"><img src='https://melobnb-seeds.s3.amazonaws.com/pets.png' alt="design-icon" />
                        <div className="amenities-text">Pets allowed</div>
                    </div>
                    <div id="amenities-icon"><img src='https://melobnb-seeds.s3.amazonaws.com/refridgerator.png' alt="design-icon" />
                        <div className="amenities-text">Refridgerator</div>
                    </div>
                    <div id="amenities-icon"><img src='https://melobnb-seeds.s3.amazonaws.com/wifi.png' alt="design-icon" />
                        <div className="amenities-wifi">Wifi</div>
                    </div>
                    <div id="amenities-icon"><img src='https://melobnb-seeds.s3.amazonaws.com/workspace.png' alt="design-icon" />
                        <div className="amenities-text">Dedicated workspace</div>
                    </div>
                </div>
                </div>
                <div className="reservation-listing-form">
                <ReservationForm />
                </div>
            </div>
            <div className="borderline3"></div>
            <h5 className="map-header">Where you'll be - (MAP coming soon)</h5>
            <div id="map-placeholder"><img src='https://melobnb-seeds.s3.amazonaws.com/map.jpeg' alt="design-icon" /></div>
            </div>
            
    )

}

export default ListingPage;