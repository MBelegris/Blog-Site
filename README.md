# Blog-Site

## Project Description

Blog-Site is a website. On this website Users will be able to read Posts made by other
users as well as create their own posts. To do this, Users can press the create post button
which will take them to the Create Post page and will be able to make a post with a title.
Users that have created an account and logged in will be able to have their Username 
attached with the Post, otherwise the Post will be authored as Anonymous. Logged-in users
will be able to edit the details of their account - name, date of birth, phone number,
username and password - as well as be able to Log out and delete their account which will
permanently remove their account with the database.

## How to Run the Project

Currently, to run the project it is required that on your local machine you:
1. Build the client docker image by running in ./client 
> docker build -t "react-app" .
2. Build the server docker image by running in ./server
> docker build -t "api-server" .
3. Pull the mongodb image by running (if you do not already have a mongodb image)
> docker pull mongo
4. Run the docker compose file by running in the main folder
> docker compose up
5. To view the website navigate to: http://localhost:3000

## Project Structure

The project is set up into two different directories: Client and Server

The client directory contains all the files based around the frontend of the website:

- The directory src contains the main information about the front end of the website:
  - Api: this is the backend api which will connect the front end to the backend
  - App: Contains the routes to each of the pages on the website
  - Components/Navbar: Contains the code needed to implement the Navigation Bar with basic styling 
  - Pages: this directory contains the files for each of the different pages on the website
- Dockerfile: contains the code needed to build the front-end docker image

The server directory contains all the files based around the backend of the website:

- Controllers: contains two files post-ctrl.js and user-ctrl.js:
  - Post-ctrl: contains the code used for all the CRUD for posts
  - User-ctrl: contains the code used for all the CRUD for users
- Database: Connects to the database
- Logger: contains a file with the code used to Log activity on the backend as well
as the log.log which holds the logs of the activities
- Routes: contains two files post-router.js and user-router.js:
  - Post-router: contains the REST endpoints for posts
  - User-router: contains teh REST endpoints for users
- Test: contains the backend testing for post-ctrl.js and user-ctrl.js
- Dockerfile: contains the code needed to build the back-end docker image

Outside these two directories the docker-compose.yml file exists which is used to 
containerise the three images used in the project.

## Technology Used

1. MERN Stack:
   - MongoDB as a database: https://www.mongodb.com/
   - Express and Node for the backend: 
     - https://nodejs.org/en/
     - https://expressjs.com/
   - React for the frontend: https://reactjs.org/
2. Docker: https://www.docker.com/

