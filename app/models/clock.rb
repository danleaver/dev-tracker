class Clock < ApplicationRecord
  def self.search(start_date, end_date)
    
    x = Date.parse(start_date) 
    y = Date.parse(end_date) + 1.day

    Clock.where(time_out: x..y) 
  end
end
