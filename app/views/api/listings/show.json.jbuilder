    json.extract! @listing, :id, :title, :description, :city, :state, :country, :zip_code, :nightly_price, :num_beds, :num_bedrooms, :num_bathrooms, :pets_allowed, :num_guest, :latitude, :longitude, :ratings, :residence_type
    json.photo @listing.photos.map {|p| p.url}
    json.hostPic @listing.host.photo.url