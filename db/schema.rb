# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_09_145807) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listings", force: :cascade do |t|
    t.bigint "host_id", null: false
    t.string "title", null: false
    t.text "description", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "country", null: false
    t.integer "zip_code", null: false
    t.integer "nightly_price", null: false
    t.integer "num_beds", null: false
    t.integer "num_bedrooms", null: false
    t.integer "num_bathrooms", null: false
    t.boolean "pets_allowed", default: false, null: false
    t.float "latitude", null: false
    t.float "longitude", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city"], name: "index_listings_on_city"
    t.index ["country"], name: "index_listings_on_country"
    t.index ["host_id"], name: "index_listings_on_host_id"
    t.index ["state"], name: "index_listings_on_state"
    t.index ["zip_code"], name: "index_listings_on_zip_code"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "listings", "users", column: "host_id"
end
