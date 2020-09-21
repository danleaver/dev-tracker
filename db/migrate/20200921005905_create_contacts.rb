class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :phone
      t.text :details
      t.string :url

      t.timestamps
    end
  end
end
