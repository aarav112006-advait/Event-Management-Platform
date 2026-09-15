require "securerandom"

class Ticket < ApplicationRecord
  belongs_to :registration
  belongs_to :ticket_tier
  has_one :event, through: :registration
  has_one :user, through: :registration

  enum status: { valid: "valid", used: "used", refunded: "refunded" }

  validates :ticket_code, presence: true, uniqueness: true
  validates :qr_code_data, presence: true
  validates :attendee_name, :attendee_email, presence: true

  before_validation :generate_ticket_code_and_qr, on: :create

  def mark_as_used!
    raise StandardError, "Ticket is not valid" unless self.status == "valid"
    update!(status: "used")
  end

  private

  def generate_ticket_code_and_qr
    self.ticket_code ||= "TKT-#{SecureRandom.hex(6).upcase}"
    self.qr_code_data ||= {
      ticket_code: self.ticket_code,
      event_id: registration&.event_id,
      attendee: self.attendee_name,
      tier: ticket_tier&.name,
      verified_at_timestamp: Time.current.to_i
    }.to_json
  end
end
