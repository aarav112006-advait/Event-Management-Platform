class CreateTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :tickets do |t|
      t.references :registration, null: false, foreign_key: true
      t.references :ticket_tier, null: false, foreign_key: true
      t.string :ticket_code, null: false
      t.text :qr_code_data, null: false
      t.string :status, null: false, default: "valid"
      t.string :attendee_name, null: false
      t.string :attendee_email, null: false

      t.timestamps
    end

    add_index :tickets, :ticket_code, unique: true
    add_index :tickets, :status
  end
end
