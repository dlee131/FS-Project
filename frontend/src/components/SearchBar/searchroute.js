import ListingMapWrapper from "../ListingMap";


function SearchRoute () = {







    return 
        (

        <div> 
        <ListingMapWrapper
          listings={[listing]}
          mapOptions={{
            center: { lat: listing.latitude, lng: listing.longitude },
            zoom: 14,
          }}
        />
        </div>
        )
}