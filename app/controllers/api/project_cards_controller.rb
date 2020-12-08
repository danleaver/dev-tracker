class Api::ProjectCardsController < ApplicationController
  def index
    render json: ProjectCard.order(created_at: :desc).limit(1)
  end

  def show
    render json: ProjectCard.find(params[:id])
  end

  def create
    project_card = ProjectCard.new(project_params)
    if project_card.save 
      render json: project_card
    else 
      render json: { errors: project_card.errors }, status: :unprocessable_entity 
    end
  end

  def update
    project_card = ProjectCard.find(params[:id])
    if project_card.update(project_params)
      render json: project_card
    else
      render json: { errors: project_card.errors }, status: :unprocessable_entity 
    end
  end

  def destroy
    ProjectCard.find(params[:id]).destroy 
    render json:  {message: 'Delete Successful'}
  end

  private 

  def project_params
    params.require(:project_card).permit(:project_id, :card_id)

  end
end
