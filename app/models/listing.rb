# == Schema Information
#
# Table name: listings
#
#  id             :bigint           not null, primary key
#  host_id        :bigint           not null
#  title          :string           not null
#  description    :text             not null
#  city           :string           not null
#  state          :string           not null
#  country        :string           not null
#  zip_code       :integer          not null
#  nightly_price  :integer          not null
#  num_beds       :integer          not null
#  num_bedrooms   :integer          not null
#  num_bathrooms  :integer          not null
#  pets_allowed   :boolean          default(FALSE), not null
#  latitude       :float            not null
#  longitude      :float            not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  ratings        :float
#  residence_type :string
#


class Listing < ApplicationRecord

    validates :host_id, :title, :description, :city, :state, :country, :zip_code, :latitude, :longitude, :ratings, :residence_type, :num_guest, presence: true
    validates :nightly_price, inclusion: { in: 10...3000, message: "must be between $10 and $3000" } 
    validates :num_beds, :num_bathrooms, :num_bedrooms, numericality: {in: 0..6}
    validates :pets_allowed, inclusion: { in: [true,false] }
    
    belongs_to :host,
    foreign_key: :host_id,
    class_name: :User,
    dependent: :destroy

    has_many :reviews,
    dependent: :destroy

    has_many :reservations,
    dependent: :destroy

    has_many_attached :photos,
    dependent: :destroy

    def avg_rating
        return "NA" if reviews.length == 0
      
        rating = [:cleanliness, :accuracy, :communication, :check_in, :value, :location]
        avg = rating.reduce(0) { |sum, rate| sum + reviews.average(rate) } / rating.length
        return avg.round(2)
      end

    def self.in_bounds(bounds)
        lower_lat, lower_long, upper_lat, upper_long = bounds
        where(lat: lower_lat..upper_lat, long: lower_long..upper_long)
    end
end
