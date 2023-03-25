class Api::ReviewsController < ApplicationController

    before_action :require_logged_in, only: [:create, :destroy, :update]

    def index
        @listing = Listing.find(params[:listing_id])
        @reviews = @listing.reviews
        render :index
    end

    def show

    end

    def create

    end

    def update
        
    end

    def destroy

    end
end
