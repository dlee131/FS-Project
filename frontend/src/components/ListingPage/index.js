import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchListings, getListings } from "../../store/listings"
import { useParams } from 'react-router-dom'
import './ListingPage.css'

// import  ListingsItem  from './ListingsItem';
// import { useHistory } from "react-router-dom"


export const ListingPage = () => {
    const dispatch = useDispatch();
    // const listings = useSelector(getListings)
    const { listingId } = useParams();
    const listing = useSelector(state => state.listings[listingId])

    
    useEffect(() => {
        dispatch(fetchListings(listingId))
      },[listingId, dispatch])

    //   if (!listings) return null;
    if (!listing) {
        return <div>Loading...</div>;
    }

    return (
         <div className="listing-indiv-page">
            <header>
                <div className="listing-title">{listing.title}</div>
                <div className="listing-location"><i className="fas fa-star"></i> {listing.ratings} • {listing.city}, {listing.state}, {listing.country}</div>
                <div className="listing-images">
                    <div className="listing-images-grid">
                            <div className="col-2 row-2"><img src={listing.photo[0]} alt="" /></div>
                            <div className="image-container"><img src={listing.photo[1]} alt="" /></div>
                            <div className="image-container"><img src={listing.photo[2]} alt="" /></div>
                            <div className="image-container"><img src={listing.photo[3]} alt="" /></div>
                            <div className="image-container"><img src={listing.photo[4]} alt="" /></div>
                    </div>
                </div>
            </header>
            <h1 className="residence-type">{`${listing.residenceType} hosted by ${listing.userName}`}</h1>
            <h2 className="listing-bed">{listing.numBedrooms} bedroom • {listing.numBeds} beds • {listing.numBathrooms} baths</h2>
            <div className="borderline"></div>
            <h1 className="requirements"> Self check-in</h1>
            <div className="borderline"></div>
            <div className="aircover-logo"><span className="air-logo">air</span>cover</div>
            <div className="aircover-text"> Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
            </div>
            <div className="borderline"></div>
            <div className="description"> {listing.description} </div>
            <div className="borderline"></div>
            <h3 className="amenities-header">What this place offers</h3>
        </div>
    )

}

export default ListingPage;