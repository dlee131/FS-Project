class Api::ReservationsController < ApplicationController

  before_action :require_logged_in, only: [:index, :create, :destroy, :update]
  

  def index
    @reservations = current_user.reservations
      render :index
  end

  def show
    @reservations = current_user.reservations
  end

  def create
    
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  def update
    @reservation = Reservation.find(params[:id])

    if @reservation.update(reservation_params)
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  def destroy
    @reservation = Reservation.find(params[:id])
    if @reservation
      @reservation.destroy
    else
      render json: { message: "Listing cannot be found."}, status: 404
    end
  end

  def reservation_params
    params.require(:reservation).permit(:user_id, :listing_id, :num_guests, :start_date, :end_date)
  end
end
