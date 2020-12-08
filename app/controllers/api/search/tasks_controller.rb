class Api::Search::TasksController < ApplicationController
  def index
    render json: Task.all
  end
end
