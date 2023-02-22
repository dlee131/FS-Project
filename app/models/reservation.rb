# == Schema Information
#
# Table name: reservations
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  listing_id :bigint           not null
#  num_guests :integer          not null
#  start_date :date             not null
#  end_date   :date             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Reservation < ApplicationRecord

    validates :user_id, :listing_id, :num_guests, :start_date, :end_date, presence: true
    # validates :start_date, presence: true, timeliness: {type: :date}
    # validates :end_date, presence: true, timeliness: {type: :date}

    # validate :end_date_after_start_date

    belongs_to :user,
    class_name: :User,
    foreign_key: :user_id

    belongs_to :listing,
    class_name: :Listing,
    foreign_key: :listing_id



end
