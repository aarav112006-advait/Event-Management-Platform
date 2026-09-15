class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  rescue_from StandardError, with: :internal_server_error if Rails.env.production?

  protected

  def authenticate_user!
    token = request.headers["Authorization"]&.split(" ")&.last
    unless token.present?
      return render json: { error: "Authorization token missing" }, status: :unauthorized
    end

    decoded = JwtService.decode(token)
    unless decoded.present? && decoded[:user_id].present?
      return render json: { error: "Invalid or expired authorization token" }, status: :unauthorized
    end

    @current_user = User.find_by(id: decoded[:user_id])
    unless @current_user
      return render json: { error: "User account not found" }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end

  def require_organizer!
    authenticate_user!
    return if performed?

    unless current_user.organizer? || current_user.admin?
      render json: { error: "Access denied. Organizer role required." }, status: :forbidden
    end
  end

  def require_admin!
    authenticate_user!
    return if performed?

    unless current_user.admin?
      render json: { error: "Access denied. Administrator role required." }, status: :forbidden
    end
  end

  private

  def record_not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def record_invalid(exception)
    render json: { error: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def parameter_missing(exception)
    render json: { error: exception.message }, status: :bad_request
  end

  def internal_server_error(exception)
    Rails.logger.error("Internal Server Error: #{exception.message}
#{exception.backtrace.join("
")}")
    render json: { error: "An internal error occurred. Please try again later." }, status: :internal_server_error
  end
end
