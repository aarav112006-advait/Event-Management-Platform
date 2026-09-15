class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.references :organizer, null: false, foreign_key: { to_table: :users }
      t.references :category, null: false, foreign_key: true
      t.string :title, null: false
      t.text :description
      t.string :venue_name
      t.string :address, null: false
      t.string :city, null: false
      t.string :state
      t.string :country, default: "India"
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.string :banner_url
      t.string :status, null: false, default: "draft"

      t.timestamps
    end

    add_index :events, :status
    add_index :events, :start_time
    add_index :events, [:latitude, :longitude]
    add_index :events, :city
  end
end
