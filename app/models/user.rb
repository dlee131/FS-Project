class User < ApplicationRecord
  has_secure_password

  before_validation :ensure_session_token
  validates :password, length: { minimum: 6 }, allow_nil: true

  def self.find_by_credentials(credential, password)
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    user = User.find_by(field => credential)
    user&.authenticate(password)
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    save!
    session_token
  end





private

  def generate_unique_session_token
    while true
        token = SecureRandom.urlsafe_base64
        return token unless User.exists?(session_token: token)
    end
  end
  end
