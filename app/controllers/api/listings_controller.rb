class Api::ListingsController < ApplicationController 

  def index
    @listings = Listing.all
    @listings = @listings.in_bounds(bounds) if bounds
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    render :show
  end

  # def create

  # end

  # def destroy

  # end

  # def update

  # end

  private
  def set_listing
    @listing = Listing.find(params[:id])
  rescue
    render json: ['Unable to find listing'], status: :not_found
  end

  def bounds
    if params[:bounds]
        params[:bounds].split(',').map(&:to_f)
    end
end
end
