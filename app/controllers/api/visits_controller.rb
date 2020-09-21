class Api::VisitsController < ApplicationController
  before_action :set_contact, only: [:index]

  def index
    render json: @contact.visits.all
  end

  def show
    render json: Visits.find(params[:id])
  end

  def create
    visit = Visit.new(visit_params)
    if visit.save 
      render json: visit
    else 
      render json: { errors: visit.errors }, status: :unprocessable_entity 
    end
  end

  def update
    visit = Visit.find(params[:id])
    if visit.update(visit_params)
      render json: visit
    else
      render json: { errors: visit.errors }, status: :unprocessable_entity 
    end
  end

  def destroy
    Visit.find(params[:id]).destroy 
    render json:  {message: 'Delete Successful'}
  end

  private

  def visit_params
    params.require(:visit).permit(:date, :details, :contact_id)
  end
  
  def set_contact
    @contact = Contact.find(params[:contact_id])
  end
end
