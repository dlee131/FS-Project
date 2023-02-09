class Listing < ApplicationRecord

    validates :host_id, :title, :description, :price, :city, :state, :country, :zip_code :latitude, :longitude, :pets_allowed, presence: true
    validates :nightly_price, inclusion: { in: 10...3000, message: "must be between $10 and $3000" } 
    validates :num_beds, :num_bathrooms, :num_bedrooms, numericality: {in: 0..5}

    belongs_to :host,
    foreign_key: :host_id,
    class_name: :User

    has_many :reviews,
    dependent: :destroy

    has_many :reservations,
    dependent: :destroy


end
