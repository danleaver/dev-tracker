class Api::ClocksController < ApplicationController
  def index
    render json: Clock.order(created_at: :desc)
  end

  def recent
    render json: Clock.order(created at ascending).limit(1)
  end

  def show
    render json: Clock.find(params[:id])
  end

  def create
    clock = Clock.new(clock_params)
    if clock.save 
      render json: clock
    else 
      render json: { errors: clock.errors }, status: :unprocessable_entity 
    end
  end

  def update
    clock = Clock.find(params[:id])
    if clock.update(clock_params)
      render json: clock
    else
      render json: { errors: clock.errors }, status: :unprocessable_entity 
    end
  end

  def destroy
    Clock.find(params[:id]).destroy 
    render json:  {message: 'Delete Successful'}
  end

  private 

  def clock_params
    params.require(:clock).permit(:time_in, :time_out)

  end
end
