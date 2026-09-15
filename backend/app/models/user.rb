class User < ApplicationRecord
  has_secure_password

  enum role: { attendee: "attendee", organizer: "organizer", admin: "admin" }

  has_many :organized_events, class_name: "Event", foreign_key: "organizer_id", dependent: :destroy
  has_many :registrations, dependent: :destroy
  has_many :tickets, through: :registrations

  validates :name, presence: true, length: { maximum: 100 }
  validates :email, presence: true, uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :role, inclusion: { in: roles.keys }
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

  before_save :downcase_email

  private

  def downcase_email
    self.email = email.downcase.strip
  end
end
