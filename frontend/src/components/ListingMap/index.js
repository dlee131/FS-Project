import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory, useParams } from "react-router-dom";
import { getListings } from "../../store/listings";
import { useSelector } from "react-redux";
import airbnbmap from "./airbnbmap.png";

import "./ListingMap.css";

function ListingMap({
  listings,
  mapOptions = {},
  mapEventHandlers = {},
  markerEventHandlers = {},
}) {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markers = useRef({});
  const history = useHistory();
  const listingId = useParams();

  // Create the map

  useEffect(() => {
    if (!map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: {
            latitude: 37.773972,
            longitude: -122.431297,
          },
          zoom: 13,
          clickableIcons: false,
          ...mapOptions,
        })
      );
    }
  }, [mapRef, map, mapOptions]);

  useEffect(() => {
    if (map) {
      const listeners = Object.entries(mapEventHandlers).map(
        ([event, handler]) =>
          window.google.maps.event.addListener(map, event, (...args) =>
            handler(...args, map)
          )
      );

      return () => listeners.forEach(window.google.maps.event.removeListener);
    }
  }, [map, mapEventHandlers]);

  useEffect(() => {
    if (map) {
        listings.forEach((listing) => {
            if (markers.current[listing.id]) return;

            let marker
            if(listingId == null) {
                marker = new window.google.maps.Marker({
                    map,
                })
            } else {
                marker = new window.google.maps.Marker({
                    map,
                    position: new window.google.maps.LatLng(listing.latitude, listing.longitude),
                    icon: airbnbmap
                })
            }

        Object.entries(markerEventHandlers).forEach(([event, handler]) => {
          marker.addListener(event, () => handler(listing));
        });
        markers.current[listing.id] = marker;
      });

      Object.entries(markers.current).forEach(([listingId, marker]) => {
        if (listings.some((listing) => listing.id.toString() === listingId))
          return;

        marker.setMap(null);
        delete markers.current[listingId];
      });
    }
  }, [listings, history, map, markerEventHandlers]);

  return (
    <div ref={mapRef} className="map">
      Map
    </div>
  );
}

function ListingMapWrapper(props) {
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <ListingMap {...props} />
    </Wrapper>
  );
}

export default ListingMapWrapper;
