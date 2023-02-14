class Api::ListingsController < ApplicationController 

  def index
    @listings = Listing.all
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
end
