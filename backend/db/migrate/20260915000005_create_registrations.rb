class CreateRegistrations < ActiveRecord::Migration[7.0]
  def change
    create_table :registrations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true
      t.decimal :total_amount, precision: 10, scale: 2, null: false, default: 0.0
      t.string :status, null: false, default: "pending"
      t.string :stripe_payment_intent_id

      t.timestamps
    end

    add_index :registrations, :status
    add_index :registrations, :stripe_payment_intent_id, unique: true
  end
end
