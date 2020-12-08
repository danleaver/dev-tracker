class Api::TasksController < ApplicationController
  before_action :set_card, only: [:index]

  def index
    render json: @card.task
  end

  def show
  end

  def create
    task = Task.new(task_params)
    if task.save 
      render json: task
    else 
      render json: { errors: task.errors }, status: :unprocessable_entity 
    end
  end

  def update
    task = Task.find(params[:id])
    if task.update(task_params)
      render json: task
    else
      render json: { errors: task.errors }, status: :unprocessable_entity 
    end
  end

  def destroy
  end


  private

  def task_params
    params.require(:task).permit(:name, :project_id, :details, :card_id)
  end
  
  def set_card
    @card = Card.find(params[:card_id])
  end
end
