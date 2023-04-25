import ListingMapWrapper from "../ListingMap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"


function SearchRoute () {

    const [] = useState("")
    const dispatch = useDispatch()
    

    return 
        (
        <div>
        <div> 
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