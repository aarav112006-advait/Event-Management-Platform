module Api
  module V1
    class RegistrationsController < ApplicationController
      before_action :authenticate_user!

      # GET /api/v1/registrations
      def index
        registrations = current_user.registrations.includes(:event, tickets: :ticket_tier).recent
        render json: registrations.map { |reg| serialize_registration(reg) }
      end

      # GET /api/v1/registrations/:id
      def show
        registration = current_user.registrations.includes(:event, tickets: :ticket_tier).find(params[:id])
        render json: serialize_registration(registration)
      end

      # POST /api/v1/registrations
      # Body structure:
      # {
      #   event_id: 1,
      #   items: [
      #     { ticket_tier_id: 1, quantity: 2, attendees: [{ name: "Alice", email: "alice@test.com" }] }
      #   ]
      # }
      def create
        event = Event.find(params[:event_id])
        items = params[:items] || []

        if items.empty?
          return render json: { error: "At least one ticket tier selection is required" }, status: :bad_request
        end

        total_amount = 0.0
        tickets_to_create = []

        ActiveRecord::Base.transaction do
          items.each do |item|
            tier = event.ticket_tiers.lock.find(item[:ticket_tier_id])
            qty = item[:quantity].to_i

            tier.reserve_tickets!(qty)
            total_amount += (tier.price * qty)

            attendees = item[:attendees] || []
            qty.times do |i|
              attendee = attendees[i] || { name: current_user.name, email: current_user.email }
              tickets_to_create << {
                ticket_tier: tier,
                attendee_name: attendee[:name],
                attendee_email: attendee[:email]
              }
            end
          end

          registration = current_user.registrations.create!(
            event: event,
            total_amount: total_amount,
            status: total_amount.zero? ? "confirmed" : "pending"
          )

          tickets_to_create.each do |t|
            registration.tickets.create!(
              ticket_tier: t[:ticket_tier],
              attendee_name: t[:attendee_name],
              attendee_email: t[:attendee_email],
              status: total_amount.zero? ? "valid" : "valid"
            )
          end

          render json: {
            message: "Registration created successfully",
            registration: serialize_registration(registration)
          }, status: :created
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      private

      def serialize_registration(reg)
        {
          id: reg.id,
          event_id: reg.event_id,
          event_title: reg.event.title,
          event_venue: reg.event.venue_name,
          event_start_time: reg.event.start_time,
          total_amount: reg.total_amount.to_f,
          status: reg.status,
          stripe_payment_intent_id: reg.stripe_payment_intent_id,
          created_at: reg.created_at,
          tickets: reg.tickets.map { |t|
            {
              id: t.id,
              ticket_code: t.ticket_code,
              tier_name: t.ticket_tier.name,
              price: t.ticket_tier.price.to_f,
              attendee_name: t.attendee_name,
              attendee_email: t.attendee_email,
              status: t.status,
              qr_code_data: t.qr_code_data
            }
          }
        }
      end
    end
  end
end
