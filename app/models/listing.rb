class Listing < ApplicationRecord

    validates :host_id, :title, :description, :city, :state, :country, :zip_code, :latitude, :longitude, :ratings, :residence_type, presence: true
    validates :nightly_price, inclusion: { in: 10...3000, message: "must be between $10 and $3000" } 
    validates :num_beds, :num_bathrooms, :num_bedrooms, numericality: {in: 0..6}
    validates :pets_allowed, inclusion: { in: [true,false] }

    belongs_to :host,
    foreign_key: :host_id,
    class_name: :User,
    dependent: :destroy

    # has_many :reviews,
    # dependent: :destroy

    # has_many :reservations,
    # dependent: :destroy

    has_many_attached :photos,
    dependent: :destroy

end
