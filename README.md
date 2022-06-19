# CRUD-API

# INSTRUCTIONS:

Make sure that you have v16 LTS Node installed on your computer
Clone or download this repo https://github.com/ed9n/CRUD-API
Open your newly created folder with your code editor
Checkout Crud-Api branch

# How to use CRUD-API

# Starting CRUD-API

* The application is run in production mode: "npm run start:prod"
* The application is run in development mode: "npm run start:dev"
* If you need testing CRUD-API: "npm run test"

# Implementation details

1. Implemented endpoint api/users
 * GET api/users is used to get all persons 
 * GET api/users/${userId} is used to get one person
 * POST api/users is used to create record about new user and store it in database
 * PUT api/users/{userId} is used to update existing user
 * DELETE api/users/${userId} is used to delete existing user from database

2. Users are stored as objects that have following properties:
 * id — unique identifier, generated on server side
 * username — user's name 
 * age — user's age 
 * hobbies — user's hobbies 

3. Port on which application is running stored in .env file

