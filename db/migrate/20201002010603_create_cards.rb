class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.datetime :time_in
      t.datetime :time_out
      t.string :details

      t.timestamps
    end
  end
end
