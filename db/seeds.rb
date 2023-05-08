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
    Reservation.destroy_all  
    Listing.destroy_all  
    User.destroy_all 


    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('reservations')
    ApplicationRecord.connection.reset_pk_sequence!('listings')
    ApplicationRecord.connection.reset_pk_sequence!('users')
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    # USING THIS FOR DEMO LOGIN! 
    user1 = User.create!(
      username: 'Demo',
      first_name: 'Demo',
      last_name: 'Lition',
      email: 'demo@user.io', 
      password: 'password'
    )  

    user1.photo.attach(
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/User/Screen+Shot+2023-05-05+at+5.08.16+PM.png'), filename: 'Demo.jpeg'})

    user2 = User.create!(
      username: 'Melo', 
      first_name: 'Dan',
      last_name: 'Lee',
      email: 'Dlee@gmail.com', 
      password: 'dlee4real'
    )

    user2.photo.attach(
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/IMG_5985.jpeg'), filename: 'Dan.jpeg'})

    user3 = User.create!(
      username: 'Willy', 
      first_name: 'Wilson',
      last_name: 'Wu',
      email: 'Willyswhilly@gmail.com', 
      password: 'passsss'
    ) 

    user3.photo.attach(
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/Screen+Shot+2023-05-05+at+3.53.17+PM.png'), filename: 'Wilson.jpeg'})
  
    user4 = User.create!(
      username: 'Stivenkang4fo4', 
      first_name: 'Stiven',
      last_name: 'Kang',
      email: 'Stiven@gmail.com', 
      password: 'password123'
    ) 

    user4.photo.attach(
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/User/Screen+Shot+2023-05-05+at+4.03.38+PM.png'), filename: 'Stiven.jpeg'})

    user5 = User.create!(
      username: 'Hani', 
      first_name: 'Sohee',
      last_name: 'Han',
      email: 'HanSohee@gmail.com', 
      password: 'password212'
    ) 

    user5.photo.attach(
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/User/han.jpeg'), filename: 'HanSohee.jpeg'})

    user6 = User.create!(
      username: 'Jookyunglee', 
      first_name: 'Joy',
      last_name: 'Lee',
      email: 'Jookyung921@gmail.com', 
      password: 'password412'
    ) 

    user7 = User.create!(
      username: 'King-James', 
      first_name: 'Lebron',
      last_name: 'James',
      email: 'KingJames@gmail.com', 
      password: 'password415'
    ) 

    user8 = User.create!(
      username: 'Queen Sejeong', 
      first_name: 'Sejeong',
      last_name: 'Kim',
      email: 'Sejeong@gmail.com', 
      password: 'password516'
    ) 

    user8.photo.attach(
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/User/KimSej.jpeg'), filename: 'Sejeong.jpeg'})

      user9 = User.create!(
        username: 'Jisoo', 
        first_name: 'Jisoo',
        last_name: 'Kim',
        email: 'Jisoo@binghamton.edu', 
        password: 'Jisoo'
      ) 


    puts "Creating listings..."
    
    listing_1 =  Listing.create!(
      host_id: 5,
      title: "The Denali - Cozy Anchorage Home with Stunning Mountain Views",
      description: "Discover the rugged beauty of Alaska with a stay at The Denali, a cozy and comfortable home located in the heart of Anchorage. With stunning views of the surrounding mountains, you'll feel right at home in this spacious and well-appointed house. Perfect for families or groups of friends, The Denali features four bedrooms and two bathrooms, as well as a fully-equipped kitchen and a large living room with plenty of space to relax and unwind. Located just minutes from downtown Anchorage, this home offers easy access to some of the city's best shopping, dining, and entertainment options.",
      city: "Anchorage",
      state: 'Alaska',
      country: "United States",
      zip_code: 32628,
      latitude: 61.216576, 
      longitude: -149.678305,
      nightly_price: 930,
      num_bedrooms: 2,
      num_beds: 2,
      num_bathrooms: 2,
      pets_allowed: true,
      residence_type: 'House',
      ratings: 4.85,
      num_guest: 4
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
      host_id: 8,
      title: "Spacious Alaska House with Breathtaking Views of Denali National Park",
      description: "Experience the beauty of Alaska from the comfort of this beautiful house. This spacious house is nestled in the heart of Alaska and offers breathtaking views of the Denali National Park. With four bedrooms and two bathrooms, there's plenty of room for your family or friends to enjoy a comfortable stay. The Aurora is conveniently located near local restaurants and shops, making it the perfect home base for your Alaskan adventure. Book your stay today!",
      city: "Fairbanks",
      state: 'Alaska',
      country: "United States",
      zip_code: 93454,
      latitude: 64.8401, 
      longitude: -147.7200,
      nightly_price: 2900,
      num_bedrooms: 4,
      num_beds: 5,
      num_bathrooms: 2,
      pets_allowed: false,
      residence_type: 'House',
      ratings: 4.62,
      num_guest: 8
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
      title: "Tranquil Rustic Cabin Getaway in Monticello for Family or Friends",
      description: "Escape to a tranquil retreat in the heart of nature with our cozy cool cabin! Perfect for a fun-filled getaway with your family or friends, our cabin boasts a charming and rustic atmosphere that is sure to delight you. Inside, you'll find a cozy and well-appointed living space with two comfortable bedrooms, three plush beds, and two clean and modern bathrooms. Enjoy the warmth of the fireplace, the natural light streaming in from the windows, and the serene surroundings that will leave you feeling refreshed and rejuvenated.",
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
      ratings: 3.74,
      num_guest: 5
    )

    listing_3.photos.attach([
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing3/listing3.1.webp'), filename: 'l3.1.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing3/listing3.2.webp'), filename: 'l3.2.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing3/listing3.3.webp'), filename: 'l3.3.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing3/listing3.4.webp'), filename: 'l3.4.webp'},
      {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing3/listing3.5.webp'), filename: 'l3.5.webp'}
    ])



    listing_4 = Listing.create!(
      host_id: 3,
      title: "Cozy Private Retreat in Flushing for Solo Travelers",
      description: "Our cozy house in Flushing is the perfect place for solo travelers looking for a comfortable and peaceful retreat. With one spacious bedroom and a modern bathroom, our house is the ideal choice for guests who value privacy and comfort. Our house is fully equipped with all the modern amenities you need to feel at home. You can enjoy high-speed Wi-Fi, cable TV, and a comfortable bed that will ensure you have a restful night's sleep.",
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
      ratings: 4.92,
      num_guest: 2
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
      title: "Comfortable and Spacious 4-Bedroom Home with Easy Access to Downtown Birmingham",
      description: "Welcome to our beautiful and spacious home. Located in the heart of Birmingham, our 4-bedroom house is perfect for families or groups of friends looking for a comfortable and relaxing retreat with easy access to all the amenities and attractions that downtown has to offer.
      Our home is designed to offer ample space for you and your loved ones to unwind and enjoy your stay. With six comfortable beds and five modern and clean bathrooms, theres plenty of space for everyone. The bedrooms are tastefully decorated, with soft lighting and comfortable bedding, ensuring a restful nights sleep.",
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
      ratings: 4.24,
      num_guest: 10
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
      title: "The Sunnyside: Spacious and Sunny 2-Bedroom Apartment in East Village, NYC",
      description: "Welcome to The Sunnyside, a sunny and spacious two-bedroom apartment located in the heart of East Village in New York. This charming and comfortable apartment is perfect for travelers who want to experience the best of New York City, with all of its attractions and amenities within easy reach. The apartment features a spacious and well-lit living room with comfortable seating, perfect for relaxing and socializing after a long day of exploring the city. The bedrooms are designed to offer a comfortable and peaceful retreat, with two plush and comfortable beds, ensuring a restful night's sleep. The apartment also features two modern and clean bathrooms, making it easy to get ready and start your day.",
      city: "New York",
      state: "New York",
      country: "United States",
      zip_code: 10009,
      latitude: 40.732444,
      longitude: -73.989907,
      nightly_price: 810,
      num_bedrooms: 2,
      num_beds: 2,
      num_bathrooms: 2,
      pets_allowed: true,
      residence_type: 'Apartment',
      ratings: 4.67,
      num_guest: 4
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
      title: "Los Angeles Highlands Haven: A Stylish and Comfortable Apartment for Solo Travelers or Couples",
      description: " A Los Angeles apartment that is perfect for your next stay in California. This beautifully decorated and fully furnished apartment has everything you need to feel at home, including fast Wi-Fi to keep you connected throughout your stay. The apartment features one spacious and comfortable bedroom, making it the perfect choice for solo travelers or couples. The bedroom is outfitted with a plush and comfortable bed, ensuring a restful night's sleep.",
      city: "Los Angeles",
      state: 'California',
      country: "United States",
      zip_code: 90211,
      latitude: 34.064020,
      longitude: -118.373725,
      nightly_price: 1370,
      num_bedrooms: 1,
      num_beds: 1,
      num_bathrooms: 1,
      pets_allowed: true,
      residence_type: 'Apartment',
      ratings: 4.86,
      num_guest: 2
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
      title: "Charming Colonial Home in Vibrant Denver Neighborhood",
      description: "This charming and comfortable house is located in a vibrant and safe neighborhood, providing easy access to the city's many attractions. As a guest, you will have access to a private bedroom that is both spacious and cozy, perfect for relaxing after a long day of exploring the city. The bedroom is one of two in the house, ensuring ample space and comfort for up to four guests. The bathroom is shared, but always clean and well-maintained for your convenience.",
      city: "Denver",
      state: "Colorado",
      country: "United States",
      zip_code: 80205,
      latitude: 39.751086, 
      longitude: -104.982463,
      nightly_price: 670,
      num_bedrooms: 2,
      num_beds: 2,
      num_bathrooms: 1,
      pets_allowed: false,
      residence_type: 'House',
      ratings: 3.74,
      num_guest: 4
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
      title: "Spacious San Diego House with Stunning Ocean Views",
      description: "A charming and spacious 2 bedroom house in San Diego with stunning ocean views. This bright and airy home is the perfect place to relax and unwind, with plenty of space for families or groups of friends. You'll love the bright and airy living room with its cozy fireplace, comfortable seating, and breathtaking views of the Pacific Ocean. The fully-equipped kitchen has everything you need to cook up a delicious meal, while the dining area is perfect for enjoying a family dinner or a game night with friends. With three comfortable bedrooms and three bathrooms, there's plenty of space for everyone to spread out and enjoy some privacy. Outside, you'll find a large patio area where you can soak up the sun, take in the ocean views, and enjoy the mild San Diego climate. The Sunset is located in one of San Diego's most sought-after neighborhoods, with easy access to world-class restaurants, shopping, and entertainment. Book your stay at The Sunset today and discover the perfect place to relax, recharge, and create unforgettable memories during your next trip to San Diego!",
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
      ratings: 4.42,
      num_guest: 10
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
      title: "Cozy Upper East Side Apartment in the Heart of Manhattan",
      description: "A spacious and comfortable apartment located in the heart of Upper Manhattan on the East Side. This apartment is the perfect place for travelers who are looking for a cozy and welcoming home away from home. With its two comfortable bedrooms, fully-equipped kitchen, and inviting living room, you'll have everything you need to relax and recharge after a long day of exploring the city. Whether you're in town for business or pleasure, you'll love the convenience of staying in one of the city's most vibrant neighborhoods, with easy access to world-class restaurants, shopping, and entertainment. And with its unbeatable location, you'll have the best of both worlds - a peaceful retreat to come home to at the end of the day, and the excitement of the city right at your doorstep. Book your stay at the Tired Traveler Inn today and discover the perfect place to rest and rejuvenate during your next trip to New York City!",
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
      ratings: 3.91,
      num_guest: 4
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
      title: "Montauk Abode - Luxurious Oceanfront Retreat in New York",
      description: "Experience the ultimate oceanfront retreat at the Montauk Abode. Situated on a secluded stretch of beach in the heart of New York's picturesque Montauk region, this stunning six-bedroom house offers unparalleled views of the Atlantic Ocean and a lush garden landscape. With its spacious, open-concept living area and large windows that let in plenty of natural light, this home is the perfect space for family gatherings or for entertaining friends. Take in the breathtaking views from the balcony, soak up the sun on the beach, or enjoy a cozy night in by the fireplace. This luxurious beachfront home is the perfect place to relax and unwind in style, with all the amenities you could need including a fully equipped kitchen, high-speed internet, and more.",
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
      ratings: 4.12,
      num_guest: 12
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
    title: "Beachfront Paradise - Spacious Condo with Stunning Ocean Views in Miami",
    description: "Escape to this luxurious beachfront paradise, where you can bask in the sun and soak up the sea breeze in style. With stunning ocean views from every window, this spacious condo is the perfect place to relax and unwind. Enjoy long walks on the beach, swimming in the crystal clear waters, or simply lounging on the balcony with a good book. With all the amenities you could need, including a fully equipped kitchen and high-speed internet, this is the perfect place to escape from the hustle and bustle of everyday life.",
    city: "Miami",
    state: "Florida",
    country: "United States",
    zip_code: 33139,
    latitude: 25.7617,
    longitude: -80.1918,
    nightly_price: 850,
    num_bedrooms: 3,
    num_beds: 5,
    num_bathrooms: 2,
    pets_allowed: false,
    residence_type: 'Hotel',
    ratings: 4.62,
    num_guest: 6
  )

  listing_12.photos.attach([
    {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing12/listing12.1.webp'), filename: 'l12.1.webp'},
    {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing12/listing12.2.webp'), filename: 'l12.2.webp'},
    {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing12/listing12.3.webp'), filename: 'l12.3.webp'},
    {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing12/listing12.4.webp'), filename: 'l12.4.webp'},
    {io:URI.open('https://melobnb-seeds.s3.amazonaws.com/listings/listing12/listing12.5.webp'), filename: 'l12.5.webp'}
  ])

  puts "Creating reviews..."

  Review.create!(
    user_id: 2,
    listing_id: 2,
    cleanliness: 5,
    accuracy: 5,
    communication: 5,
    location: 5,
    check_in: 4,
    value: 5,
    comment: 'This stunning house is an absolute gem, located in the heart of one of the most beautiful regions of the state. I really loved the views of the Denali National Park as they were simply breathtaking, and you will feel truly at home in this spacious house.
    I felt like with four bedrooms and two bathrooms, there was plenty of space for everyone in my group to spread out and relax comfortably haha.. The house is beautifully furnished, with all the amenities anyone could really ask for. The location was just a short walk away from some of the best local restaurants and shops in the area. 
    I cant recommend this stay highly enough. Whether you are planning a family vacation or a romantic getaway, this house is the perfect home base for your Alaskan adventure. You really wont regret it if you book your stay here!'
  )

  Review.create!(
    user_id: 2,
    listing_id: 1,
    cleanliness: 4,
    accuracy: 4,
    communication: 2,
    location: 5,
    check_in: 4,
    value: 4,
    comment: 'If you are planning a trip to Anchorage, I would recommend staying at The Denali. I felt as though this cozy and comfortable home was the perfect place to unwind after a day of exploring the beautiful Alaskan wilderness. 
    The views of the surrounding mountains were truly stunning. The stay provided plenty of room for my family and friends to relax and just chill. And with its close proximity to downtown Anchorage, we were able to easily explore all the city has to offer. 
    Although I really had a great time here, I would also like to add that the communication with the host was a bit difficult.. Other than that, this stay definitely exceeded my expectations and made my trip to Alaska truly unforgettable.'
  )

  Review.create!(
    user_id: 4,
    listing_id: 3,
    cleanliness: 2,
    accuracy: 4,
    communication: 4,
    location: 5,
    check_in: 4,
    value: 3,
    comment: 'I recently stayed at the cozy cool cabin and had a decent experience overall. The natural surroundings were certainly charming and it provided a great escape from the hustle and bustle of everyday life. The living space was well-appointed, with comfortable bedrooms and modern bathrooms, and the fireplace was a nice touch that added to the cozy ambiance of the cabin.
    However, there were a few minor issues that prevented me from giving a higher rating, to be honest.. The cleanliness of the cabin was not up to my expectations, as I found some dust and dirt in certain areas. I felt like the pictures did not do much justice.
    If you are looking for a peaceful retreat in nature and dont really mind a few minor inconveniences, I would say this cabin is a decent stay for you.'
  )

  Review.create!(
    user_id: 5,
    listing_id: 6,
    cleanliness: 5,
    accuracy: 3,
    communication: 5,
    location: 5,
    check_in: 4,
    value: 5,
    comment: 'I had a great stay at The Sunnyside! The apartment was pretty spacious, clean, and well-appointed, with all the amenities I needed to feel right at home. The location was perfect, with plenty of great restaurants and attractions within easy walking distance. 
    I particularly enjoyed the comfortable beds and the peaceful atmosphere of the bedrooms.'
  )

  Review.create!(
    user_id: 6,
    listing_id: 10,
    cleanliness: 5,
    accuracy: 4,
    communication: 5,
    location: 5,
    check_in: 4,
    value: 5,
    comment: 'I absolutely loved my stay here! The apartment is situated in such a convenient location in Upper Manhattan, right in the heart of the East Side. 
    The apartment itself is spacious, clean, and incredibly comfortable, I felt like I was right at home from the moment I arrived. The bedrooms are both well-appointed and cozy, with comfortable beds and plenty of space to unpack and relax.
    The kitchen is fully-equipped with everything you need to cook your own meals, and there is even a lovely dining area where you can enjoy your meals with friends or family.
    One of my favorite parts of the apartment was the living room, it is the perfect place to unwind after a long day of exploring the city. I would recommend this stay to a lot of my friends for sure.'
  )
  
  Review.create!(
    user_id: 5,
    listing_id: 2,
    cleanliness: 5,
    accuracy: 5,
    communication: 5,
    location: 5,
    check_in: 4,
    value: 5,
    comment: 'I had an incredible four day stretch of staying at this Melobnb! I would say the location is pretty  is just a short drive away from local restaurants and shops, making it the perfect home base for exploring all that this incredible state has to offer. 
    After a day of adventure, there is literally nothing better than relaxing on the deck and taking in the stunning views. If anyone is trying to visit Alaska for whatever reason I would definitely recommend this place for sure.'
  )

  Review.create!(
    user_id: 8,
    listing_id: 4,
    cleanliness: 3,
    accuracy: 2,
    communication: 2,
    location: 3,
    check_in: 2,
    value: 1,
    comment: 'I was very disappointed with my stay at this Melobnb in Flushing. While the house may be cozy, it definitely did not meet my expectations. It was definitely not worth the nightly price. 
    The location is not ideal for travelers looking to explore the city as it is far from any attractions or restaurants, and it was a hassle to get anywhere.
    The house itself was also a letdown. While the bedroom was spacious, the rest of the house felt cramped and outdated. The bathroom was not as modern as advertised, and there were several issues with the plumbing that made it difficult to shower and use the sink. 
    The amenities were pretty lackluster and the expected "high-speed" Wi-Fi was slow and spotty, and the cable TV had limited channels.
    The hosts were also not as welcoming as I would have liked. They were difficult to reach and did not provide much information or assistance during my stay.'
  )

  Review.create!(
    user_id: 4,
    listing_id: 8,
    cleanliness: 5,
    accuracy: 4,
    communication: 4,
    location: 5,
    check_in: 5,
    value: 5,
    comment: 'I was really looking forward to renting a melobnb stay that the one and only Lebron James owns. I can definitely say that this was by far the greatest decision I have made in my lifetime.
    I really enjoyed the apartment itself, definitely a perfect spot to stay at for four people! I would recommend this stay to my other friends and family who are willing to visit Denver!'
  )

  Review.create!(
    user_id: 4,
    listing_id: 2,
    cleanliness: 5,
    accuracy: 5,
    communication: 5,
    location: 5,
    check_in: 5,
    value: 5,
    comment: 'If you are ever trying to visit Alaska and is looking for a melobnb stay, look no further than this one right here. I believe that this is probably one of the best melobnb stays I have experienced in my lifetime'
  )

  puts "Done!"

  end