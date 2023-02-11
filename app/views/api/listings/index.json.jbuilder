json.listings do
@listings.each do |listing|
    json.set! listing.id do
        json.extract! listing,
        :id, :title, :description, :city, :state, :country, :zip_code, :nightly_price, 
        :num_beds, :num_bedrooms, :num_bathrooms, :pets_allowed, :latitude, :longitude,
    end

    end
end
