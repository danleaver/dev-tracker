class Project < ApplicationRecord
    has_many :cards, through: :project_cards
    has_many :project_cards, dependent: :destroy
    
end
