require "stripe"

Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
Stripe.api_version = "2023-10-16"
