class Contact < ApplicationRecord
  has_many :visits, dependent: :destroy
end
