class Api::CardsController < ApplicationController
  def index
    render json: Card.order(created_at: :desc)
  end

  def search_range
    render json: Card.search(params[:start_date], params[:end_date])
  end

  def show
    render json: Card.find(params[:id])
  end

  def create
    card = Card.new(card_params)
    if card.save 
      render json: card
    else 
      render json: { errors: card.errors }, status: :unprocessable_entity 
    end
  end

  def update
    card = Card.find(params[:id])
    if card.update(card_params)
      render json: card
    else
      render json: { errors: card.errors }, status: :unprocessable_entity 
    end
  end

  def destroy
    Card.find(params[:id]).destroy 
    render json:  {message: 'Delete Successful'}
  end

  private 

  def card_params
    params.require(:card).permit(:time_in, :time_out, :details, :project_id)

  end
end
