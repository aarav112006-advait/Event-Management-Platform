class Registration < ApplicationRecord
  belongs_to :user
  belongs_to :event
  has_many :tickets, dependent: :destroy

  enum status: { pending: "pending", confirmed: "confirmed", cancelled: "cancelled" }

  validates :total_amount, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :status, inclusion: { in: statuses.keys }

  scope :recent, -> { order(created_at: :desc) }

  def confirm_payment!
    transaction do
      update!(status: "confirmed")
      tickets.update_all(status: "valid")
    end
  end

  def cancel_registration!
    transaction do
      update!(status: "cancelled")
      tickets.each do |ticket|
        ticket.update!(status: "refunded")
        ticket.ticket_tier.restore_tickets!(1)
      end
    end
  end
end
