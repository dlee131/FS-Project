import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchListings, getListings } from "../../store/listings"
import  ListingsItem  from './ListingsItem';
import { useHistory } from "react-router-dom"
import { Filter } from '../Filters/filter'
import ListingMapWrapper from "../ListingMap";


function ListingsIndexPage() {
    const dispatch = useDispatch();
    const listings = useSelector(getListings)
    const history = useHistory();
    const [mapToggle, setMapToggle] = useState(false)

    useEffect(() => {
        dispatch(fetchListings())
      },[dispatch])
      
    const handleClick = (listingId) => {
      history.push(`/listings/${listingId}`);
      window.scrollTo(0, 0);
    };
  //map toggle
  const showMap = () => {
      if (mapToggle === true) {
          setMapToggle(false)
      } else {
          setMapToggle(true)
      }
  }

  return (
    <div>
      <Filter />
      <div className="listings-container">
        {!mapToggle ? (
          <div className="listings-index">
            {listings.map((listing) => (
              <div key={listing.id}>
                <ListingsItem
                  listing={listing}
                  handleClick={() => handleClick(listing.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="map-container">
            <ListingMapWrapper
              listings={listings}
              markerEventHandlers={{
                click: (listing) => history.push(`/listings/${listing.id}`),
              }}
              mapOptions={{
                center: { lat: 40.754787, lng: -73.820393 },
                zoom: 8,
              }}
            >
            </ListingMapWrapper>
          </div>
        )}
        <div className="index-map-container">
              <button onClick={showMap}>
                {!mapToggle ? (
                  <p>
                    Show map<i className="fa-solid fa-list-ul fa-show"></i>
                  </p>
                ) : (
                  <p>
                    Show list<i className="fa-solid fa-map fa-show"></i>
                  </p>
                )}
              </button>
        </div>
      </div>
      <div className="border-line"></div>
      <div className="footer"></div>
    </div>
  );
};


export default ListingsIndexPage;