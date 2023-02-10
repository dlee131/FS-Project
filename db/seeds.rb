# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Listing.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    # USING THIS FOR DEMO LOGIN! 
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating listings..."
    listing_1 =  Listing.create!(
      host_id: 4,
      title: "The Glen",
      description: "Come experience a once in a lifetime experience at The Glen where you can seclude yourself and find peace within.",
      city: "Cross City",
      state: 'Florida',
      country: "United States",
      zip_code: 32628,
      latitude: 29.510805,
      longitude: -83.002117,
      nightly_price: 120,
      num_bedrooms: 1,
      num_beds: 1,
      num_baths: 1,
      pets_allowed: true
    )

    listing_2 = Listing.create!(
      host_id: 1,
      title: "The Magenta",
      description: "Enjoy your stay at one of the most fun and scenic places in Santa Maria, California, which is well located one mile from downtown.",
      city: "Santa Maria",
      state: 'California',
      country: "United States",
      zip_code: 93454,
      latitude: 34.934276,
      longitudeitude: -120.413169,
      nightly_price: 520,
      num_bedrooms: 4,
      num_beds: 5,
      num_baths: 2,
      pets_allowed: false
    )

    listing_3 = Listing.create!(
      host_id: 3,
      title: "Cozy Cool Cabin",
      description: "The coziest and coolest cabin where you can have fun with friends and family.",
      city: "Monticello",
      state: 'New York',
      country: "United States",
      zip_code: 12701,
      latitude: 41.889237, 
      longitude: -74.531028,
      nightly_price: 380,
      num_bedrooms: 2,
      num_beds: 3,
      num_baths: 2,
      pets_allowed: true,
    )

    listing_4 = Listing.create!(
      host_id: 7,
      title: "Willy's Stay",
      description: "A lonely night for a lonely man.",
      city: "Flushing",
      state: "New York",
      country: "United States",
      zip_code: 11354,
      latitude: 40.754787,
      longitude: -73.820393,
      nightly_price: 140,
      num_bedrooms: 1,
      num_beds: 1,
      num_baths: 1,
      pets_allowed: false
    )

    listing_5 = Listing.create!(
      host_id: 5,
      title: "Uncle Joe's Crib",
      description: "Spacious Home with easy access to downtown",
      city: "Birmingham",
      state: "Alabama",
      country: "United States",
      zip_code: 35204,
      latitude: 33.516275, 
      longitude: -86.845339,
      nightly_price: 870,
      num_bedrooms: 5,
      num_beds: 10,
      num_baths: 5,
      pets_allowed: false
    )

    listing_6 = Listing.create!(
      host_id: 8,
      title: "",
      description: "Sunny room in East Village – close to everything",
      city: "New York",
      state: "New York",
      country: "United States",
      zip_code: 10009,
      latitude: 40.732444,
      longitude: -73.989907,
      nightly_price: 370,
      num_bedrooms: 2,
      num_beds: 2,
      num_baths: 2,
      pets_allowed: true
    )

    listing_7 = Listing.create!(
      host_id: 8,
      title: "Los Angeles Highlands Haven",
      description: "Charming and bright Los Angeles apt - fast Wi-Fi!",
      city: "Los Angeles",
      state: 'California',
      country: "United States",
      zip_code: 90211,
      latitude: 34.064020,
      longitude: -118.373725,
      nightly_price: 70,
      num_bedrooms: 1,
      num_beds: 1,
      num_baths: 1,
      pets_allowed: true
    )

    listing_8 = Listing.create!(
      host_id: 7,
      title: "The Northern Colonial",
      description: "Private Bedroom in Denver Close to Everything",
      city: "",
      state: "Denver",
      country: "United States",
      zip_code: 80205,
      latitude: 39.751086, 
      longitude: -104.982463,
      nightly_price: 70,
      num_bedrooms: 2,
      num_beds: 2,
      num_baths: 1,
      pets_allowed: false
    )

    listing_9 = Listing.create!(
      host_id: 6,
      title: "The Sunset",
      description: "Charming 2 bedroom in San Diego with Ocean view
      ",
      city: "San Diego",
      state: "California",
      country: "United States",
      zip_code: 92101,
      latitude: 32.715091, 
      longitude: -117.170705,
      nightly_price: 890,
      num_bedrooms: 3,
      num_beds: 6,
      num_baths: 3,
      pets_allowed: false
    )

    listing_10 = Listing.create!(
      host_id: 4,
      title: "The Tired Traveler Inn",
      description: "Comfy Spacious room/Upper Manhattan – East Side",
      city: "New York",
      state: "New York",
      country: "United States",
      zip_code: 10021,
      latitude: 40.774596,
      longitude: -73.965134,
      nightly_price: 70,
      num_bedrooms: 2,
      num_beds: 2,
      num_baths: 1,
      pets_allowed: false
    )

    listing_11 = Listing.create!(
      host_id: 3,
      title: "Williamsburg Abode",
      description: "Bright Brooklyn apartment with a garden view",
      city: "New York",
      state: "New York",
      country: "United States",
      zip_code: 11249,
      latitude: 40.709430, 
      longitude: -73.965459,
      nightly_price: 70,
      num_bedrooms: 6,
      num_beds: 8,
      num_baths: 4,
      pets_allowed: false
    )


  
    puts "Done!"
  end