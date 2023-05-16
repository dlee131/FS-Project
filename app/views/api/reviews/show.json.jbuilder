json.extract! @review, :id, :user_id, :listing_id, :cleanliness, :accuracy, :communication, :location, :check_in, :value, :comment
json.profile @review.user.photo.url

