@reservations.each do |reservation|
    json.set! reservation.id do
        json.extract! reservation,
        :id, :user_id, :listing_id, :num_guests, :start_date, :end_date
    json.photo reservation.listing.photos.map {|photo| photo.url}
    json.city reservation.listing.city
    json.state reservation.listing.state
    json.residenceType reservation.listing.residence_type
    json.firstName reservation.listing.host.first_name
    json.nightlyPrice reservation.listing.nightly_price
    json.numGuest reservation.listing.num_guest
    end
end