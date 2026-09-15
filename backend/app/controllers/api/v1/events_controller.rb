module Api
  module V1
    class EventsController < ApplicationController
      before_action :authenticate_user!, except: [:index, :show, :nearby, :search]
      before_action :require_organizer!, only: [:create, :update, :destroy]
      before_action :set_event, only: [:show, :update, :destroy]

      # GET /api/v1/events
      def index
        events = Event.published_events.includes(:category, :ticket_tiers)

        events = events.by_category(params[:category_id]) if params[:category_id].present?
        events = events.search_by_keyword(params[:q]) if params[:q].present?

        if params[:city].present?
          events = events.where("city ILIKE ?", "%#{params[:city]}%")
        end

        if params[:start_date].present?
          events = events.where("start_time >= ?", Time.parse(params[:start_date]))
        end

        # Location radius filtering
        if params[:latitude].present? && params[:longitude].present?
          radius = params[:radius_km] || 25
          events = events.near_coordinates(params[:latitude], params[:longitude], radius)
        else
          events = events.order(start_time: :asc)
        end

        page = (params[:page] || 1).to_i
        per_page = (params[:per_page] || 12).to_i
        paginated_events = events.offset((page - 1) * per_page).limit(per_page)

        render json: {
          total_count: events.count,
          page: page,
          per_page: per_page,
          events: paginated_events.map { |e| serialize_event_card(e) }
        }
      end

      # GET /api/v1/events/nearby
      def nearby
        lat = params[:latitude]
        lng = params[:longitude]
        radius = params[:radius_km] || 30

        if lat.blank? || lng.blank?
          return render json: { error: "latitude and longitude parameters are required" }, status: :bad_request
        end

        events = Event.published_events
                      .upcoming
                      .near_coordinates(lat, lng, radius)
                      .limit(params[:limit] || 10)

        render json: {
          radius_km: radius.to_f,
          events: events.map { |e| serialize_event_card(e) }
        }
      end

      # GET /api/v1/events/search
      def search
        events = Event.published_events.search_by_keyword(params[:q]).order(start_time: :asc).limit(20)
        render json: events.map { |e| serialize_event_card(e) }
      end

      # GET /api/v1/events/:id
      def show
        render json: serialize_event_detail(@event)
      end

      # POST /api/v1/events
      def create
        @event = current_user.organized_events.build(event_params)

        # Geocode if coordinates not explicitly provided
        if @event.latitude.blank? || @event.longitude.blank?
          geo = GoogleMapsService.geocode(@event.full_address)
          if geo
            @event.latitude = geo[:latitude]
            @event.longitude = geo[:longitude]
          end
        end

        if @event.save
          render json: serialize_event_detail(@event), status: :created
        else
          render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PUT/PATCH /api/v1/events/:id
      def update
        unless @event.organizer_id == current_user.id || current_user.admin?
          return render json: { error: "Unauthorized to edit this event" }, status: :forbidden
        end

        if @event.update(event_params)
          render json: serialize_event_detail(@event)
        else
          render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/events/:id
      def destroy
        unless @event.organizer_id == current_user.id || current_user.admin?
          return render json: { error: "Unauthorized to delete this event" }, status: :forbidden
        end

        @event.destroy
        render json: { message: "Event removed successfully" }, status: :ok
      end

      private

      def set_event
        @event = Event.includes(:category, :ticket_tiers, :organizer).find(params[:id])
      end

      def event_params
        params.require(:event).permit(
          :category_id, :title, :description, :venue_name, :address,
          :city, :state, :country, :latitude, :longitude,
          :start_time, :end_time, :banner_url, :status
        )
      end

      def serialize_event_card(event)
        {
          id: event.id,
          title: event.title,
          category: { id: event.category&.id, name: event.category&.name, slug: event.category&.slug },
          venue_name: event.venue_name,
          city: event.city,
          address: event.address,
          latitude: event.latitude,
          longitude: event.longitude,
          distance_km: event.try(:distance_km)&.to_f&.round(2),
          start_time: event.start_time,
          end_time: event.end_time,
          banner_url: event.banner_url,
          status: event.status,
          min_price: event.ticket_tiers.minimum(:price) || 0.0
        }
      end

      def serialize_event_detail(event)
        serialize_event_card(event).merge(
          description: event.description,
          organizer: { id: event.organizer.id, name: event.organizer.name, email: event.organizer.email },
          ticket_tiers: event.ticket_tiers.map { |tier|
            {
              id: tier.id,
              name: tier.name,
              price: tier.price.to_f,
              capacity: tier.capacity,
              available_quantity: tier.available_quantity,
              available: tier.available?,
              sales_start: tier.sales_start,
              sales_end: tier.sales_end
            }
          }
        )
      end
    end
  end
end
