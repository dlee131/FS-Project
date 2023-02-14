class Reservation < ApplicationRecord

    validates :user_id, :listing_id, :num_guests, presence: true
    validates :start_date, presence: true, timeliness: {type: :date}
    validates :end_date, presence: true, timeliness: {type: :date}
    
    validate :end_date_after_start_date

    belongs_to :user,
    class_name: :User,
    foreign_key: :user_id

    belongs_to :listing,
    class_name: :Listing,
    foreign_key: :listing_id

    private

    def end_date_after_start_date
        if end_date && start_date && end_date <= start_date
          errors.add(:end_date, "must be after the start date")
        end
    end

end
