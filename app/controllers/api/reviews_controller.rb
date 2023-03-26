class Api::ReviewsController < ApplicationController

    before_action :require_logged_in, only: [:create, :destroy, :update]

    def index
        @listing = Listing.find_by(id: params[:listing_id])
        if @listing
          @reviews = @listing.reviews
        else
          # Where no listing is found!
          @reviews = []
        end
        render :index
      end

    def show
        @review = Review.find_by(id: params[:id])
        render :show
    end

    def create
        @review = Review.new(review_params)
        if @review.save 
            render :show 
        else
            render json: @review.errors.full_messages, status: 422
        end
    end

    def update
        @review = Review.find_by(id: params[:id])
        if @review.update(review_params)
            render :show
        else
            render json: @review.errors.full_messages, status: 422
        end
    end

    def destroy
        @review = Review.find_by(id: params[:id])
        if @review
            @review.destroy
        else
            render json: { message: "review cannot be found."}, status: 404
        end
    end

    private

    def review_params
        params.require(:review).permit(:user_id, :listing_id, :cleanliness, :accuracy, :communication, :location, :check_in, :value, :comment)
    end
end
