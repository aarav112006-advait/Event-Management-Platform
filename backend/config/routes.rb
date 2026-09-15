Rails.application.routes.draw do
  # Health check probe
  get "/health", to: proc { [200, { "Content-Type" => "application/json" }, [{ status: "ok", timestamp: Time.current }.to_json]] }

  namespace :api do
    namespace :v1 do
      # Authentication & User Profile
      post "auth/register", to: "authentication#register"
      post "auth/login", to: "authentication#login"
      get  "auth/me", to: "authentication#me"

      # Categories
      resources :categories, only: [:index, :show]

      # Events and Nested Ticket Tiers
      resources :events do
        collection do
          get :search
          get :nearby
        end
        resources :ticket_tiers, only: [:index, :create, :update, :destroy]
      end

      # Registrations & Tickets
      resources :registrations, only: [:index, :show, :create] do
        member do
          get :tickets
        end
      end

      # Payments & Webhook
      post "payments/create_intent", to: "payments#create_intent"
      post "payments/webhook", to: "payments#webhook"
    end
  end
end
