class Api::ReservationsController < ApplicationController

  before_action :require_logged_in, only: [:index, :create, :destroy, :update]
  

  def index
    @reservations = current_user.reservations
    render: index
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
