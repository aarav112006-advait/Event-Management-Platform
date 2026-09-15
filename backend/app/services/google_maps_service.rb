require "net/http"
require "json"
require "uri"

class GoogleMapsService
  GEOCODING_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json"

  def self.geocode(address)
    return nil if address.blank?

    api_key = ENV["GOOGLE_MAPS_API_KEY"]
    return fallback_geocode(address) if api_key.blank?

    uri = URI("#{GEOCODING_BASE_URL}?address=#{URI.encode_www_form_component(address)}&key=#{api_key}")
    response = Net::HTTP.get_response(uri)

    return nil unless response.is_a?(Net::HTTPSuccess)

    data = JSON.parse(response.body)
    if data["status"] == "OK" && data["results"].any?
      location = data["results"][0]["geometry"]["location"]
      {
        latitude: location["lat"],
        longitude: location["lng"],
        formatted_address: data["results"][0]["formatted_address"]
      }
    else
      fallback_geocode(address)
    end
  rescue StandardError => e
    Rails.logger.error("GoogleMapsService Geocoding Error: #{e.message}")
    fallback_geocode(address)
  end

  def self.reverse_geocode(latitude, longitude)
    return nil if latitude.blank? || longitude.blank?

    api_key = ENV["GOOGLE_MAPS_API_KEY"]
    return nil if api_key.blank?

    uri = URI("#{GEOCODING_BASE_URL}?latlng=#{latitude},#{longitude}&key=#{api_key}")
    response = Net::HTTP.get_response(uri)
    return nil unless response.is_a?(Net::HTTPSuccess)

    data = JSON.parse(response.body)
    if data["status"] == "OK" && data["results"].any?
      data["results"][0]["formatted_address"]
    end
  rescue StandardError => e
    Rails.logger.error("GoogleMapsService Reverse Geocoding Error: #{e.message}")
    nil
  end

  private

  def self.fallback_geocode(address)
    # Default city fallbacks for offline development/testing
    city_map = {
      "mumbai" => { latitude: 19.0760, longitude: 72.8777 },
      "pune" => { latitude: 18.5204, longitude: 73.8567 },
      "bengaluru" => { latitude: 12.9716, longitude: 77.5946 },
      "bangalore" => { latitude: 12.9716, longitude: 77.5946 },
      "delhi" => { latitude: 28.7041, longitude: 77.1025 },
      "ahmedabad" => { latitude: 23.0225, longitude: 72.5714 }
    }

    lowered = address.to_s.downcase
    city_map.each do |city, coords|
      if lowered.include?(city)
        return coords.merge(formatted_address: address)
      end
    end

    nil
  end
end
