This project was bootstrapped with React and Redux.

This project is still in development.

### Running it locally
You can run the project locally by:

#### To run the front-end:
1. Go to this repository (https://github.com/indocom/visintus-client) and clone the repo.
2. Navigate to the folder where you clone the front-end.
3. run ```npm start``` on this folder
4. Visit https://localhost:3001 to view the web.

#### To run the back-end
1. Go to https://github.com/indocom/visintus-backend and clone the repository
2. Setup mongoDB, and create "visintus_development" database
3. If you use Linux, you can run ```sudo service mongodb start``` and wait until [OK]. Your database is running.
4. Navigate to the folder you clone the back-end. 
5. If it's not your first time, go straight to step 5. Otherwise, run ```npm run dev:db:seed``` to seed the database. When you get [OK], just ^C to stop server.
6. Run ```npm run dev``` and make sure you get db connection [OK]
7. Visit https://localhost:3000 and you should see "Welcome to Visintus API"

### Admin routes
To visit admin page, you can go directly to https://localhost:3001/admin from your browser's address bar
