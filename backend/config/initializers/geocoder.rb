Geocoder.configure(
  lookup: :google,
  api_key: ENV["GOOGLE_MAPS_API_KEY"],
  timeout: 5,
  units: :km,
  use_https: true,
  distances: :spherical
)
