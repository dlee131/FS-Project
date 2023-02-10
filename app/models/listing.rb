class Listing < ApplicationRecord

    validates :host_id, :title, :description, :city, :state, :country, :zip_code, :latitude, :longitude, presence: true
    validates :nightly_price, inclusion: { in: 10...1000, message: "must be between $10 and $1000" } 
    validates :num_beds, :num_bathrooms, :num_bedrooms, numericality: {in: 0..6}
    validates :pets_allowed, inclusion: { in: [true,false] }

    belongs_to :host,
    foreign_key: :host_id,
    class_name: :User

    has_many :reviews,
    dependent: :destroy

    has_many :reservations,
    dependent: :destroy


end
