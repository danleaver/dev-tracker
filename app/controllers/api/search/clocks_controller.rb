class Api::Search::ClocksController < ApplicationController
  def index
    render json: Clock.order(created_at: :desc).limit(1)
  end
end
