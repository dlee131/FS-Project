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
        dispatch(fetchListings())
      },[listingId, dispatch])



    return (
         <div className="listing-indiv-page">
            <header>
                <div className="listing-title">{listing.title}</div>
                <div className="listing-location"><i class="fas fa-star"></i> {listing.ratings} • {listing.city}, {listing.state}, {listing.country}</div>
                <div className="listing-images">
                    <div className="listing-images-grid">
                            <div className="col-2 row-2"><img src={listing.photoUrls[0]} alt="" /></div>
                            <div className="image-container"><img src={listing.photoUrls[1]} alt="" /></div>
                            <div className="image-container"><img src={listing.photoUrls[2]} alt="" /></div>
                            <div className="image-container"><img src={listing.photoUrls[3]} alt="" /></div>
                            <div className="image-container"><img src={listing.photoUrls[4]} alt="" /></div>
                    </div>
                </div>
            </header>
        <h1 className="residence-type">{`${listing.residenceType} hosted by ${listing.userName}`}</h1>
        <h2 className="listing-bed">{listing.numBedrooms} bedroom • {listing.numBeds} beds • {listing.numBathrooms} baths</h2>
        <div className="borderline"></div>
        <div className="description"> {listing.description} </div>
        </div>
    )

}

export default ListingPage;