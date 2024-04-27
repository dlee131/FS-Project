class Review < ApplicationRecord

    validates :user_id, :listing_id, presence: true 
    validates :cleanliness, :accuracy, :communication, :location, :check_in, :value, presence: true, inclusion: { in: 0..5 }
    validates :comment, presence: true, length: { maximum: 1000, message: "Comment is too long, maximum is 1000 characters" }

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    
    belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing

end
