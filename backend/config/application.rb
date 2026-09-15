require_relative "boot"

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

module EventManagementBackend
  class Application < Rails::Application
    config.load_defaults 7.0
    config.api_only = true

    # Autoload services directory
    config.autoload_paths << Rails.root.join("app", "services")
    config.eager_load_paths << Rails.root.join("app", "services")
  end
end
