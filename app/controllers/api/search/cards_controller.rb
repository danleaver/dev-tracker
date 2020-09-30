class Api::Search::CardsController < ApplicationController
  def index
    render json: Card.order(created_at: :desc).limit(1)
  end
end
