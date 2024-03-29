# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

before_validation :ensure_session_token

has_secure_password

validates :first_name, :last_name, presence: true 
validates :username, 
uniqueness: true, 
length: { in: 3..30 }, 
format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
validates :email, 
uniqueness: true, 
length: { in: 3..255 }, 
format: { with: URI::MailTo::EMAIL_REGEXP }
validates :session_token, presence: true, uniqueness: true
validates :password, length: { in: 6..255 }, allow_nil: true

has_many :listings,
foreign_key: :host_id,
class_name: :Listing,
dependent: :destroy

has_many :reservations,
class_name: :Reservation,
dependent: :destroy

has_many :hosted_reservations,
through: :reservations,
source: :listings

has_many :reviews,
foreign_key: :user_id,
class_name: :Review,
dependent: :destroy

has_one_attached :photo,
dependent: :destroy

def self.find_by_credentials(credential, password) 
    match = URI::MailTo::EMAIL_REGEXP
   if match.match?(credential)
    user = User.find_by(email: credential)
   else
    user = User.find_by(username: credential)
   end

    if user&.authenticate(password)
        return user
    else
        nil
    end
end

def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    session_token
end

private

def generate_unique_session_token
    while true
        token = SecureRandom.urlsafe_base64
        return token unless User.exists?(session_token: token)
    end
end

def ensure_session_token
    self.session_token ||= generate_unique_session_token
end


end
