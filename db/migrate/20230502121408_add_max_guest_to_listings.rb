class AddMaxGuestToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :num_guest, :integer
  end
end
