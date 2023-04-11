@listings.each do |listing|
    json.set! listing.id do
        json.extract! listing,
        :id, :title, :description, :city, :state, :country, :zip_code, :nightly_price, :num_beds, :num_bedrooms, :num_bathrooms, :pets_allowed, :latitude, :longitude, :ratings, :residence_type
        json.photo listing.photos.map {|photo| photo.url}
        json.userName listing.host.username
        # json.totalReviews listing.avg_rating
    end

    end
