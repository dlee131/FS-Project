class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.references :host, null: false, foreign_key: {to_table: :users}
      t.string :title, null: false 
      t.text :description, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :country, null: false
      t.integer :zip_code, null: false
      t.integer :nightly_price, null: false
      t.integer :num_beds, null: false
      t.integer :num_bedrooms, null: false
      t.integer :num_bathrooms, null: false
      t.boolean :pets_allowed, null: false, default: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.timestamps
    end
    add_index :listings, :city, unique: true
    add_index :listings, :state, unique: true
    add_index :listings, :country, unique: true
    add_index :listings, :zip_code, unique: true
  end
end
