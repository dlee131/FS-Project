@reservations.each do |reservation|
    json.set! reservation.id do
        json.extract! reservation,
        :id, :user_id, :listing_id, :num_guests, :start_date, :end_date

    json.photo reservation.listing.photos.map {|photo| photo.url}
    end
end