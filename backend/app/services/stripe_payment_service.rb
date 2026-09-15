class StripePaymentService
  def self.create_payment_intent(registration, currency = "inr")
    # Stripe expects amounts in smallest currency unit (e.g. paise for INR, cents for USD)
    amount_in_cents = (registration.total_amount * 100).to_i

    intent = Stripe::PaymentIntent.create({
      amount: amount_in_cents,
      currency: currency.downcase,
      payment_method_types: ["card"],
      metadata: {
        registration_id: registration.id,
        event_id: registration.event_id,
        user_id: registration.user_id,
        event_title: registration.event.title
      },
      description: "Registration for #{registration.event.title} - Reg ##{registration.id}"
    })

    registration.update!(stripe_payment_intent_id: intent.id)
    intent
  end

  def self.handle_successful_payment(payment_intent)
    registration_id = payment_intent.metadata&.registration_id
    return unless registration_id

    registration = Registration.find_by(id: registration_id)
    return unless registration

    registration.confirm_payment!
    Rails.logger.info("Successfully confirmed Registration ##{registration.id} via Stripe PaymentIntent #{payment_intent.id}")
    registration
  end

  def self.handle_failed_payment(payment_intent)
    registration_id = payment_intent.metadata&.registration_id
    return unless registration_id

    registration = Registration.find_by(id: registration_id)
    return unless registration

    registration.cancel_registration!
    Rails.logger.warn("Cancelled Registration ##{registration.id} due to failed PaymentIntent #{payment_intent.id}")
    registration
  end
end
