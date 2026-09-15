module Api
  module V1
    class TicketTiersController < ApplicationController
      before_action :authenticate_user!, except: [:index]
      before_action :require_organizer!, only: [:create, :update, :destroy]
      before_action :set_event

      # GET /api/v1/events/:event_id/ticket_tiers
      def index
        tiers = @event.ticket_tiers.order(price: :asc)
        render json: tiers
      end

      # POST /api/v1/events/:event_id/ticket_tiers
      def create
        unless @event.organizer_id == current_user.id || current_user.admin?
          return render json: { error: "Forbidden" }, status: :forbidden
        end

        tier = @event.ticket_tiers.build(tier_params)
        if tier.save
          render json: tier, status: :created
        else
          render json: { errors: tier.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PUT /api/v1/events/:event_id/ticket_tiers/:id
      def update
        tier = @event.ticket_tiers.find(params[:id])
        unless @event.organizer_id == current_user.id || current_user.admin?
          return render json: { error: "Forbidden" }, status: :forbidden
        end

        if tier.update(tier_params)
          render json: tier
        else
          render json: { errors: tier.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/events/:event_id/ticket_tiers/:id
      def destroy
        tier = @event.ticket_tiers.find(params[:id])
        unless @event.organizer_id == current_user.id || current_user.admin?
          return render json: { error: "Forbidden" }, status: :forbidden
        end

        tier.destroy
        render json: { message: "Ticket tier removed" }
      end

      private

      def set_event
        @event = Event.find(params[:event_id])
      end

      def tier_params
        params.require(:ticket_tier).permit(:name, :price, :capacity, :available_quantity, :sales_start, :sales_end)
      end
    end
  end
end
