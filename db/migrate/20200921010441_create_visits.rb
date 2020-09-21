class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.datetime :date
      t.text :details
      t.belongs_to :contact, null: false, foreign_key: true

      t.timestamps
    end
  end
end
