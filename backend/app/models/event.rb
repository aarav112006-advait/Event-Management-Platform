class Event < ApplicationRecord
  belongs_to :organizer, class_name: "User"
  belongs_to :category
  has_many :ticket_tiers, dependent: :destroy
  has_many :registrations, dependent: :destroy
  has_many :tickets, through: :registrations

  enum status: { draft: "draft", published: "published", cancelled: "cancelled" }

  geocoded_by :full_address
  after_validation :geocode, if: ->(obj) { obj.address_changed? || obj.city_changed? }

  validates :title, presence: true, length: { maximum: 200 }
  validates :address, :city, :start_time, :end_time, presence: true
  validate :end_time_after_start_time

  scope :published_events, -> { where(status: "published") }
  scope :upcoming, -> { where("start_time >= ?", Time.current).order(start_time: :asc) }
  scope :by_category, ->(category_id) { where(category_id: category_id) if category_id.present? }
  scope :search_by_keyword, ->(query) {
    if query.present?
      where("title ILIKE :q OR description ILIKE :q OR city ILIKE :q OR venue_name ILIKE :q", q: "%#{query}%")
    end
  }

  # Spatial radius search using Haversine calculation
  scope :near_coordinates, ->(lat, lng, radius_km = 25) {
    return all if lat.blank? || lng.blank?

    # Earth radius in kilometers ~ 6371.0
    haversine_formula = <<-SQL.squish
      (6371.0 * acos(
        LEAST(1.0, GREATEST(-1.0,
          cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
          sin(radians(?)) * sin(radians(latitude))
        ))
      ))
    SQL

    where("#{haversine_formula} <= ?", lat.to_f, lng.to_f, lat.to_f, radius_km.to_f)
      .select("events.*, (#{haversine_formula}) AS distance_km", lat.to_f, lng.to_f, lat.to_f)
      .order("distance_km ASC")
  }

  def full_address
    [venue_name, address, city, state, country].compact.join(", ")
  end

  private

  def end_time_after_start_time
    return if end_time.blank? || start_time.blank?

    if end_time < start_time
      errors.add(:end_time, "must be after the start time")
    end
  end
end
