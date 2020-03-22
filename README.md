# Visintus

A web application to manage visit programs.

## Running it locally (development)

You can run the project locally by following the setup guide below.

### Setup MongoDB

This project uses [MongoDB](https://www.mongodb.com/) to store the data.
You may refer to the [official documentation](https://docs.mongodb.com/manual/administration/install-community/) on how to setup the database on your device.

### Setup the backend

1. Ensure that you have MongoDB running on your system and navigate to the `backend` folder.

2. Create the databases

  By default, the backend service uses the following databases:  
    - Production: `visintus`
    - Development: `visintus_development`
    - Test: `visintus_test`  
    
  You may need to create those databases first before running the backend service.
  Besides, you can also change the databases name in the config file(s).  

3. Create a user to access the database(s).  

  Please ensure that you grant the user read/write access to those databases.  
  By default, the backend service will try to use a user with username `visintus` and password `visintus`.
  To configure your own database access, you can set your own `DB_URL` in the environment file that will be explained in the next point.

4. Configure your environment variables.  

  If you don't have the environment file yet, go to your favorite code editor and create a .env file. 
  To do so, copy from the .env.example file and specify the required values based on your own configuration.

5. Run `npm install` to install all dependencies.

6. Run ```npm run dev:db:seed``` to seed the database. When you get [OK], just click `CTRL+C` to stop.

### Running the backend

1. Ensure that you have MongoDB running on your background service and you have completed the basic setup.
3. Run `npm run dev` on the back-end folder and make sure you get db connection [OK]
4. To test if all you've done correctly, visit https://localhost:3000 and you should see "Welcome to Visintus API"

### Setup the webclient

1. Navigate to the `webclient` folder.
2. Run `npm install` to install all dependencies.

### Running the webclient

1. Ensure that you have the backend service running.
4. Run `npm start`
5. Visit https://localhost:3001 to view the web.

### Setup MailDev

Some of the features in Visintus involve sending email(s) to user. 
In the development mode, it will try to access a proxy at `localhost:1025` to "send" the email.

In this project, we use MailDev to configure the proxy and display the emails.
To setup MailDev, you can just follow the instructions below:

1. Install MailDev by running: `npm install -g maildev`.
2. Open a separate terminal and run `maildev`.
2. Open https://localhost:1080 to open maildev in the browser.

### Creating your superadmin account
1. Ensure that you have the backend, webclient, and maildev running.
2. Go to https://localhost:3001/login from your browser's address bar and click "Do not have an account?".
4. Fill up credentials for your superadmin account. Click signup.
5. Open the maildev tab, and an email should have been sent to you.
6. Click on the link and it will redirect you to verify your email.
7. Open mongo console in terminal, login to "visintus_development" database using your db account.
8. Make sure you have the user in the db by running `db.users.find({}).pretty()` in the mongo console.
9. Update your superadmin account to have `role: "superadmin"`.
10. Now, go to https://localhost:3001/login and login using your superadmin account.
11. If all is well, go to https://localhost:3001/admin and you should see "User" on the left pane of Admin page, where you can change authorization rules for other users.

### Accessing admin page
1. Make sure you have made a superadmin user to access all admin functionalities
2. Go to https://localhost:3001/login from your browser's address bar and login using your superadmin credentials.
3. Then either go to https://localhost:3001/admin or account > admin to go to admin page.
