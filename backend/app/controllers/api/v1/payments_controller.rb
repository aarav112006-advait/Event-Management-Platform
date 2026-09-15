module Api
  module V1
    class PaymentsController < ApplicationController
      before_action :authenticate_user!, only: [:create_intent]

      # POST /api/v1/payments/create_intent
      def create_intent
        registration = current_user.registrations.find(params[:registration_id])

        if registration.confirmed?
          return render json: { message: "Registration is already paid and confirmed" }, status: :ok
        end

        if registration.total_amount <= 0
          registration.confirm_payment!
          return render json: { message: "Free event registration confirmed automatically" }, status: :ok
        end

        currency = params[:currency] || "inr"
        payment_intent = StripePaymentService.create_payment_intent(registration, currency)

        render json: {
          client_secret: payment_intent.client_secret,
          payment_intent_id: payment_intent.id,
          amount: payment_intent.amount,
          currency: payment_intent.currency,
          registration_id: registration.id
        }
      rescue Stripe::StripeError => e
        render json: { error: e.message }, status: :payment_required
      rescue StandardError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      # POST /api/v1/payments/webhook
      def webhook
        payload = request.body.read
        sig_header = request.env["HTTP_STRIPE_SIGNATURE"]
        webhook_secret = ENV["STRIPE_WEBHOOK_SECRET"]

        event = nil

        if webhook_secret.present?
          begin
            event = Stripe::Webhook.construct_event(payload, sig_header, webhook_secret)
          rescue JSON::ParserError => e
            return render json: { error: "Invalid payload format" }, status: :bad_request
          rescue Stripe::SignatureVerificationError => e
            return render json: { error: "Signature verification failed" }, status: :bad_request
          end
        else
          data = JSON.parse(payload)
          event = Stripe::Event.construct_from(data)
        end

        case event.type
        when "payment_intent.succeeded"
          payment_intent = event.data.object
          StripePaymentService.handle_successful_payment(payment_intent)
        when "payment_intent.payment_failed"
          payment_intent = event.data.object
          StripePaymentService.handle_failed_payment(payment_intent)
        else
          Rails.logger.info("Unhandled Stripe event type: #{event.type}")
        end

        render json: { status: "success" }, status: :ok
      end
    end
  end
end
