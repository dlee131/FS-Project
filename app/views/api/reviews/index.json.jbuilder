@reviews.each do |review| 
    json.set! review.id do
        json.extract! review,
        :id, :user_id, :listing_id, :cleanliness, :accuracy, :communication, :location, :check_in, :value, :comment
    end
end