class Api::ProjectsController < ApplicationController
  def index
    # render json: Project.order(created_at: :desc)
    render json: Project.all

  end

  def show
    render json: Project.find(params[:id])
  end

  def create
    project = Project.new(project_oarams)
    if project.save 
      render json: project
    else 
      render json: { errors: project.errors }, status: :unprocessable_entity 
    end
  end

  def update
    project = Project.find(params[:id])
    if project.update(project_params)
      render json: project
    else
      render json: { errors: project.errors }, status: :unprocessable_entity 
    end
  end

  def destroy
    Project.find(params[:id]).destroy 
    render json:  {message: 'Delete Successful'}
  end

  private 

  def project_params
    params.require(:project).permit(:name, :details)

  end
end
