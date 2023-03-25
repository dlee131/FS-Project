class Review < ApplicationRecord

    validates :user_id, :listing_id, :comment, presence: true 
    validates :cleanliness, :accuracy, :communication, :location, :check_in, :value, presence: true, inclusion: { in: 0..5 }

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing

end
