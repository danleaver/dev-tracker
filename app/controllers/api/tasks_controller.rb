class Api::TasksController < ApplicationController
  def index
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
  end

  def destroy
  end


  private

  def task_params
    params.require(:task).permit(:name, :project_id, :details, :card_id)
  end
  
end
