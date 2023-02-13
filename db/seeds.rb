# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)




ApplicationRecord.transaction do 

  require "open-uri"
  
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Listing.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('listings')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    # USING THIS FOR DEMO LOGIN! 
    user1 = User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )  

    user2 = User.create!(
      username: 'Melo', 
      email: 'dlee@gmail.com', 
      password: 'dlee4real'
    )

    user3 = User.create!(
      username: 'Willy', 
      email: 'willyswhilly@gmail.com', 
      password: 'passsss'
    ) 

    user4 = User.create!(
      username: 'Stivenkang4fo4', 
      email: 'stiven@gmail.com', 
      password: 'password123'
    ) 

    user5 = User.create!(
      username: 'Himothydelaqueens', 
      email: 'timothydelaqueens@gmail.com', 
      password: 'password212'
    ) 

    user6 = User.create!(
      username: 'Jookyunglee', 
      email: 'jookyung921@gmail.com', 
      password: 'password412'
    ) 

    user7 =User.create!(
      username: 'King-James', 
      email: 'kingjames@gmail.com', 
      password: 'password415'
    ) 

    user8 = User.create!(
      username: 'Lina312', 
      email: 'Lina312@gmail.com', 
      password: 'password516'
    ) 


    # More users
    # 11.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    #   }) 
    # end

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
      num_bathrooms: 1,
      pets_allowed: true,
      residence_type: 'House',
      ratings: 4.85
    )

    listing_1.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing1/listing1.1.webp'), filename: 'l1.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing1/listing1.2.webp'), filename: 'l1.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing1/listing1.3.webp'), filename: 'l1.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing1/listing1.4.webp'), filename: 'l1.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing1/listing1.5.webp'), filename: 'l1.5.webp'}
    ])
# DONT WRAP SEED CODE IN APPLICATIONRECORD.TRANSACTION 



    listing_2 = Listing.create!(
      host_id: 1,
      title: "The Magenta",
      description: "Enjoy your stay at one of the most fun and scenic places in Santa Maria, California, which is well located one mile from downtown.",
      city: "Santa Maria",
      state: 'California',
      country: "United States",
      zip_code: 93454,
      latitude: 34.934276,
      longitude: -120.413169,
      nightly_price: 820,
      num_bedrooms: 4,
      num_beds: 5,
      num_bathrooms: 2,
      pets_allowed: false,
      residence_type: 'House',
      ratings: 4.62
    )

    listing_2.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing2/listing_2.png'), filename: 'l2.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing2/listing2.2.webp'), filename: 'l2.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing2/listing2.3.webp'), filename: 'l2.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing2/listing2.4.webp'), filename: 'l2.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing2/listing2.5.webp'), filename: 'l2.5.webp'}
    ])

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
      nightly_price: 840,
      num_bedrooms: 2,
      num_beds: 3,
      num_bathrooms: 2,
      pets_allowed: true,
      residence_type: 'Cabin',
      ratings: 3.74
    )

    listing_3.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing3/listing3.1.webp'), filename: 'l3.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing3/listing3.2.webp'), filename: 'l3.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing3/listing3.3.webp'), filename: 'l3.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing3/listing3.4.webp'), filename: 'l3.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing3/listing3.5.webp'), filename: 'l3.5.webp'}
    ])



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
      nightly_price: 1280,
      num_bedrooms: 1,
      num_beds: 1,
      num_bathrooms: 1,
      pets_allowed: false,
      residence_type: 'House',
      ratings: 4.92
    )

    listing_4.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing4/listing4.1.webp'), filename: 'l4.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing4/listing4.2.webp'), filename: 'l4.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing4/listing4.3.webp'), filename: 'l4.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing4/listing4.4.webp'), filename: 'l4.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing4/listing4.5.webp'), filename: 'l4.5.webp'}
    ])

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
      num_bedrooms: 4,
      num_beds: 6,
      num_bathrooms: 5,
      pets_allowed: false,
      residence_type: 'House',
      ratings: 4.24
    )

    listing_5.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing5/listing5.1.webp'), filename: 'l5.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing5/listing5.2.webp'), filename: 'l5.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing5/listing5.3.webp'), filename: 'l5.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing5/listing5.4.webp'), filename: 'l5.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing5/listing5.5.webp'), filename: 'l5.5.webp'}
    ])

    listing_6 = Listing.create!(
      host_id: 8,
      title: "The Sunnyside",
      description: "Sunny room in East Village – close to everything.",
      city: "New York",
      state: "New York",
      country: "United States",
      zip_code: 10009,
      latitude: 40.732444,
      longitude: -73.989907,
      nightly_price: 370,
      num_bedrooms: 2,
      num_beds: 2,
      num_bathrooms: 2,
      pets_allowed: true,
      residence_type: 'Apartment',
      ratings: 4.67
    )

    listing_6.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing6/listing6.1.webp'), filename: 'l6.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing6/listing6.2.webp'), filename: 'l6.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing6/listing6.3.webp'), filename: 'l6.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing6/listing6.4.webp'), filename: 'l6.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing6/listing6.5.webp'), filename: 'l6.5.webp'}
    ])

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
      num_bathrooms: 1,
      pets_allowed: true,
      residence_type: 'Apartment',
      ratings: 4.86
    )

    listing_7.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing.7/listing7.1.webp'), filename: 'l7.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing.7/listing7.2.webp'), filename: 'l7.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing.7/listing7.3.webp'), filename: 'l7.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing.7/listing7.4.webp'), filename: 'l7.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing.7/listing7.5.webp'), filename: 'l7.5.webp'}
    ])

    listing_8 = Listing.create!(
      host_id: 7,
      title: "The Northern Colonial",
      description: "Private Bedroom in Denver Close to Everything.",
      city: "Denver",
      state: "Colorado",
      country: "United States",
      zip_code: 80205,
      latitude: 39.751086, 
      longitude: -104.982463,
      nightly_price: 70,
      num_bedrooms: 2,
      num_beds: 2,
      num_bathrooms: 1,
      pets_allowed: false,
      residence_type: 'House',
      ratings: 3.74
    )


    listing_8.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing8/listing8.1.webp'), filename: 'l8.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing8/listing8.2.webp'), filename: 'l8.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing8/listing8.3.webp'), filename: 'l8.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing8/listing8.4.webp'), filename: 'l8.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing8/listing8.5.webp'), filename: 'l8.5.webp'}
    ])


    listing_9 = Listing.create!(
      host_id: 6,
      title: "The Sunset",
      description: "Charming 2 bedroom in San Diego with Ocean view.",
      city: "San Diego",
      state: "California",
      country: "United States",
      zip_code: 92101,
      latitude: 32.715091, 
      longitude: -117.170705,
      nightly_price: 2890,
      num_bedrooms: 3,
      num_beds: 6,
      num_bathrooms: 3,
      pets_allowed: false,
      residence_type: 'House',
      ratings: 4.42
    )

    listing_9.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing9/listing9.1.webp'), filename: 'l9.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing9/listing9.2.webp'), filename: 'l9.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing9/listing9.3.webp'), filename: 'l9.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing9/listing9.4.webp'), filename: 'l9.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing9/listing9.5.webp'), filename: 'l9.5.webp'}
    ])

    listing_10 = Listing.create!(
      host_id: 4,
      title: "The Tired Traveler Inn",
      description: "Comfy Spacious apartment/Upper Manhattan – East Side.",
      city: "New York",
      state: "New York",
      country: "United States",
      zip_code: 10021,
      latitude: 40.774596,
      longitude: -73.965134,
      nightly_price: 970,
      num_bedrooms: 2,
      num_beds: 2,
      num_bathrooms: 1,
      pets_allowed: false,
      residence_type: 'Apartment',
      ratings: 3.91
    )

    listing_10.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing10/listing10.1.webp'), filename: 'l10.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing10/listing10.2.webp'), filename: 'l10.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing10/listing10.3.webp'), filename: 'l10.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing10/listing10.4.webp'), filename: 'l10.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing10/listing10.5.webp'), filename: 'l10.5.webp'}
    ])


    listing_11 = Listing.create!(
      host_id: 2,
      title: "Montauk Abode",
      description: "Ocean house with a garden view.",
      city: "New York",
      state: "New York",
      country: "United States",
      zip_code: 11249,
      latitude: 41.036191,
      longitude:  -71.961215,
      nightly_price: 1270,
      num_bedrooms: 6,
      num_beds: 6,
      num_bathrooms: 4,
      pets_allowed: false,
      residence_type: 'House',
      ratings: 4.12
    )

    listing_11.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing11/listing11.1.webp'), filename: 'l11.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing11/listing11.2.webp'), filename: 'l11.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing11/listing11.3.webp'), filename: 'l11.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing11/listing11.4.webp'), filename: 'l11.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing11/listing11.5.webp'), filename: 'l11.5.webp'}
    ])

  listing_12 = Listing.create!(
    host_id: 2,
    title: "Oceanfront Royale",
    description: "This location is recognized for its intimacy and its direct access to the beach.",
    city: "Miami Beach",
    state: "Miami",
    country: "United States",
    zip_code: 33109,
    latitude: 25.834639, 
    longitude: -80.124694,
    nightly_price: 1270,
    num_bedrooms: 6,
    num_beds: 6,
    num_bathrooms: 4,
    pets_allowed: false,
    residence_type: 'Hotel',
    ratings: 4.62
  )

  listing_12.photos.attach([
    {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing12/listing12.1.webp'), filename: 'l12.1.webp'},
    {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing12/listing12.2.webp'), filename: 'l12.2.webp'},
    {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing12/listing12.3.webp'), filename: 'l12.3.webp'},
    {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing12/listing12.4.webp'), filename: 'l12.4.webp'},
    {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing12/listing12.5.webp'), filename: 'l12.5.webp'}
  ])



    puts "Done!"
  end