module Api
  module V1
    class CategoriesController < ApplicationController
      def index
        categories = Category.all.order(name: :asc)
        render json: categories.as_json(only: [:id, :name, :slug, :icon])
      end

      def show
        category = Category.find_by!(slug: params[:id])
        render json: category.as_json(only: [:id, :name, :slug, :icon])
      end
    end
  end
end
