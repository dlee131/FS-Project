class Api::SessionsController < ApplicationController

  # before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:destroy]

  def show
    if current_user
      @user = current_user
      # render 'api/users/show'
      render json: { user: current_user}
    else
      render json: { user: nil }
    end
  end

  def create
    credential = params[:credential]
    password = params[:password]
    @user = User.find_by_credentials(credential, password)

    if @user 
      login!(@user)
      render json: { user: @user } 
      # render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.']}, status: :unauthorized
    end
  end

  def destroy
    @user = current_user
    if @user
      logout!
      render "api/users/show"
    else
      render json: ["You are not signed in"], status: 404
    end
  end
end




