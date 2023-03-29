class Api::ReviewsController < ApplicationController

    before_action :require_logged_in, only: [:create, :destroy, :update]

    #   def index
    #     @reviews = Review.all
    #     if params[:listing_id]
    #       @reviews = @reviews.where(listing_id: params[:listing_id])
    #     elsif params[:user_id]
    #       @reviews = @reviews.where(user_id: params[:user_id]).order(start_date: :desc)
    #     end
    #     render :index
    #   end
    def index
        @reviews = Review.where(listing_id: params[:listing_id])
      end

    def show
        @review = Review.find_by(id: params[:id])
        render :show
    end

    def create
    
        @review = Review.new(review_params)
        # debugger
        if @review.save 
            # debugger
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
