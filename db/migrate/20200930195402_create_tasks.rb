class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.bigint :project_id
      t.string :details
      t.string :name
      t.belongs_to :card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
