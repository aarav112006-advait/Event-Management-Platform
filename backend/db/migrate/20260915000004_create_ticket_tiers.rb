class CreateTicketTiers < ActiveRecord::Migration[7.0]
  def change
    create_table :ticket_tiers do |t|
      t.references :event, null: false, foreign_key: true
      t.string :name, null: false
      t.decimal :price, precision: 10, scale: 2, null: false, default: 0.0
      t.integer :capacity, null: false
      t.integer :available_quantity, null: false
      t.datetime :sales_start
      t.datetime :sales_end

      t.timestamps
    end

    add_index :ticket_tiers, [:event_id, :name]
  end
end
