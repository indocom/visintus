This project was bootstrapped with React and Redux.

This project is still in development.

### Running it locally
You can run the project locally by:

#### To run the front-end:
1. Go to this repository (https://github.com/indocom/visintus-client) and clone the repo.
2. Navigate to the folder where you clone the front-end.
3. run ```npm start``` on this folder
4. Visit https://localhost:3001 to view the web.

#### Setting up the back-end (if it's your first time)
1. Go to https://github.com/indocom/visintus-backend and clone the repository
2. Install mongoDB and run ```sudo service mongodb start``` and wait until [OK].
3. Create "visintus_development" database
4. Create a user for the db
5. Follow the instructions for running the backend (see below)
6. When you're done, go to your favorite code editor and create a .env file. To do so, copy from the .env.example file and specify the DB_URL, JWT_SECRET and JWT_EXPIRATION_IN_MINUTES
7. If you would like to disable authentication, go to config/routes/ and for each route, comment the following 2 lines: 
```
 usersController.requireAuth,
 usersController.roleAuthorization(['admin'])
```

#### Running your back-end
1. Run ```sudo service mongodb start``` and wait until [OK]. If so, your database is running.
2. Navigate to the folder you clone the back-end. 
3. If it's not your first time, go straight to step 4. Otherwise, run ```npm run dev:db:seed``` to seed the database. When you get [OK], just ^C to stop server.
4. Run ```npm run dev``` on the back-end folder and make sure you get db connection [OK]
5. To test if all you've done correctly, visit https://localhost:3000 and you should see "Welcome to Visintus API"

### Admin routes
To visit admin page, you can go directly to https://localhost:3001/admin from your browser's address bar.
