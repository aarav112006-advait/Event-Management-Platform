module Api
  module V1
    class AuthenticationController < ApplicationController
      before_action :authenticate_user!, only: [:me]

      # POST /api/v1/auth/register
      def register
        user = User.new(user_params)
        if user.save
          token = JwtService.encode(user_id: user.id, email: user.email, role: user.role)
          render json: {
            message: "User registered successfully",
            token: token,
            user: serialize_user(user)
          }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # POST /api/v1/auth/login
      def login
        user = User.find_by(email: params[:email]&.downcase&.strip)
        if user&.authenticate(params[:password])
          token = JwtService.encode(user_id: user.id, email: user.email, role: user.role)
          render json: {
            message: "Login successful",
            token: token,
            user: serialize_user(user)
          }, status: :ok
        else
          render json: { error: "Invalid email or password" }, status: :unauthorized
        end
      end

      # GET /api/v1/auth/me
      def me
        render json: { user: serialize_user(current_user) }, status: :ok
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation, :role)
      end

      def serialize_user(user)
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at
        }
      end
    end
  end
end
