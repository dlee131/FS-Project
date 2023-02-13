class AddRatingsAndResidenceTypeToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :ratings, :float
    add_column :listings, :residence_type, :string
  end
end
