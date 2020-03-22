This project was bootstrapped with React and Redux.

This project is still in development.

## Running it locally
<hr>
You can run the project locally by:

### Running your front-end:
1. Go to this repository (https://github.com/indocom/visintus-client) and clone the repo.
2. Navigate to the folder where you clone the front-end.
3. Run ```npm install``` to install all dependencies.
4. Run ```npm start```
5. Visit https://localhost:3001 to view the web.

### Setting up the back-end (if it's your first time)
1. Go to https://github.com/indocom/visintus-backend and clone the repository
2. Install mongoDB and run ```sudo service mongodb start``` and wait until [OK].
3. Create "visintus_development" database
4. Create a user for the db.
5. When you're done, go to your favorite code editor and create a .env file. To do so, copy from the .env.example file and specify the DB_URL, JWT_SECRET and JWT_EXPIRATION_IN_MINUTES
6. Run ```npm install``` to install all dependencies.
7. Follow the instruction for running backend (below)
8. Follow the instruction for creating your superadmin account

### Running your back-end
1. Run ```sudo service mongodb start``` and wait until [OK]. If so, your database is running.
2. Navigate to the folder you clone the back-end. 
3. If it's not your first time, go straight to step 4. Otherwise, run ```npm run dev:db:seed``` to seed the database. When you get [OK], just ^C to stop server.
4. Run ```npm run dev``` on the back-end folder and make sure you get db connection [OK]
5. To test if all you've done correctly, visit https://localhost:3000 and you should see "Welcome to Visintus API"

### Creating your superadmin account (for development)
1. Run maildev ```npm install -g maildev ``` on a separate terminal 
2. Open https://localhost:1080 to open maildev in the browser.
3. Run the backend, and go to https://localhost:3001/login from your browser's address bar and click "Do not have an account?" link
4. Fill up credentials for your superadmin account. Click signup.
5. Open the maildev tab, and an email should have been sent to you.
6. Click on the link and it will redirect you to verify your email.
7. Open mongo console in terminal, login to "visintus_development" database using your db account.
8. Make sure you have the user in the db by running ```db.users.find({}).pretty()``` in the mongo console.
9. Update your superadmin account to have ```role: "superadmin" ```.
10. Now, go to https://localhost:3001/login and login using your superadmin account.
11. If all is well, go to https://localhost:3001/admin and you should see " User " on the left pane of Admin page, where you can change authorization rules for other users.

### Accessing admin page
1. Make sure you have made a superadmin user to access all admin functionalities
2. Go to https://localhost:3001/login from your browser's address bar and login using your superadmin credentials.
3. Then either go to https://localhost:3001/admin or account > admin to go to admin page.

