class Card < ApplicationRecord
  has_many :projects, through: :project_cards
  has_many :project_cards, dependent: :destroy
  
  def self.search(start_date, end_date)
    
    x = Date.parse(start_date) 
    y = Date.parse(end_date) + 1.day

    Card.where(time_in: x..y).order(created_at: :desc)
  end
end
