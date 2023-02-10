class Api::ListingsController < ApplicationController 


  def index
    @listings = Listing.all
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    render :show
  end

  def create

  end

  def destroy

  end

  def update
    
  end

end
