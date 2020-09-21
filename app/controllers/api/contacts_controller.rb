class Api::ContactsController < ApplicationController

  def index
    render json: Contact.all
  end

  def show
    render json: Contact.find(params[:id])
  end

  def create
    contact = Contact.new(contact_params)
    if contact.save 
      render json: contact
    else 
      render json: { errors: contact.errors }, status: :unprocessable_entity 
    end
  end

  def update
    contact = Contact.find(params[:id])
    if contact.update(contact_params)
      render json: contact
    else
      render json: { errors: contact.errors }, status: :unprocessable_entity 
    end
  end

  def destroy
    Contact.find(params[:id]).destroy 
    render json:  {message: 'Delete Successful'}
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :phone, :details, :url)
  end
  
end
