json.listing do 
    json.extract! @listing,:id, :title, :description, :city, :state, :country, :zip_code, :nightly_price, :num_beds, :num_bedrooms, :num_bathrooms, :pets_allowed, :latitude, :longitude, :ratings, :residence_type
    json.photo_urls @listing.photos.map {|p| p.url}
end