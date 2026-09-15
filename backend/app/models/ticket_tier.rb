class TicketTier < ApplicationRecord
  belongs_to :event
  has_many :tickets, dependent: :restrict_with_error

  validates :name, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :capacity, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :available_quantity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  before_validation :set_initial_available_quantity, on: :create

  def available?(requested_qty = 1)
    on_sale? && available_quantity >= requested_qty
  end

  def on_sale?
    now = Time.current
    (sales_start.nil? || sales_start <= now) && (sales_end.nil? || sales_end >= now)
  end

  # Atomic inventory decrement
  def reserve_tickets!(qty)
    raise StandardError, "Insufficient tickets available for #{name}" unless available?(qty)

    update!(available_quantity: available_quantity - qty)
  end

  def restore_tickets!(qty)
    update!(available_quantity: [available_quantity + qty, capacity].min)
  end

  private

  def set_initial_available_quantity
    self.available_quantity ||= self.capacity
  end
end
