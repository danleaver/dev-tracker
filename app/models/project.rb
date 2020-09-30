class Project < ApplicationRecord
  has_many :cards, through: :tasks
end
