class Reservation < ApplicationRecord

    validates :user_id, :listing_id, :num_guests, :start_date, :end_date, presence: true

    belongs_to :user,
    class_name: :User,

    belongs_to :listing,
    class_name: :Listing,
    foreign_key: :listing_id



end
