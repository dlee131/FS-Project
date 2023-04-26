import ListingMapWrapper from "../ListingMap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getListings } from "../../store/listings";
import { useParams } from "react-router-dom";



function SearchRoute () {

    const [] = useState("")
    const dispatch = useDispatch()
    const listing = useSelector((state) => state.listings[listingId]);
    const listings = useSelector(getListings);
    const { listingId } = useParams();
    

    return 
        (
        <div>
        <div className="search-map"> 
        <ListingMapWrapper
          listings={[listing]}
          mapOptions={{
            center: { lat: listing.latitude, lng: listing.longitude },
            zoom: 14,
          }}
        />
        </div>

        </div>
        )
}

export default SearchRoute