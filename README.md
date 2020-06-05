<p align="center"><img width="400" height="300" src="https://github.com/NeilVakharia1712/ToDoApplication/blob/master/public/images/logo.jpeg"></p>

# FINISH IT _NOW 
FINISH IT _NOW is your personal planner to list out all the tasks you need to complete.

<p float="left"><img width="270" height="560" src="https://github.com/NeilVakharia1712/ToDoApplication/blob/master/public/images/step1.jpeg">
<img width="270" height="560" src="https://github.com/NeilVakharia1712/ToDoApplication/blob/master/public/images/step2.jpeg">
<img width="270" height="560" src="https://github.com/NeilVakharia1712/ToDoApplication/blob/master/public/images/step3.jpeg">

Link to the app: https://todo-1757e.web.app


## Set Up

### System Requirements for Development
* nodejs
* npm
* firebase

### Installation
Clone the repository
```
git clone https://github.com/NeilVakharia1712/ToDoApplication.git
```
Inside the thrift-shift folder, run
```
npm install
```

### Firebase
Create a project with Firebase and connect to the app: https://firebase.google.com/docs/web/setup

For React apps, install firebase node module
```
npm install --save firebase
```
Import firebase into the app
```
import firebase from 'firebase/app';
import 'firebase/database';
```
Create a file `src/utils/FirebaseConfig.js` and add the Firebase config object as found in the Firebase console.
```
var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};
```


Login to your firebase account locally by running
```
firebase login
```

The app uses:
* [Realtime Database](https://firebase.google.com/docs/database)
* [Firebase Hosting](https://firebase.google.com/docs/hosting)

### Running and Deployment
To run app locally
```
npm start
```
To deploy application, first:

In a terminal window on your machine, install the Firebase CLI globally with
```
npm install -g firebase-tools
```
Switch into your local app directory and initialize your app's Firebase configuration:
```
firebase init
```
Choose hosting, cloud storage, and the real-time database.
When setting up Firebase locally, answer the prompts as follows:
1. What Firebase features do you want? Pick Database, Storage, and Hosting if you'd like to deploy your web app on Firebase.
2. What Firebase project to connect to? Pick the one you created. 
3. What is your public directory? Enter build. Do not accept the default value "public".

After you set up the firebase, run 
```
npm run build
firebase deploy
```

## Built With
* [React](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)

## Future Development
* Change database to be relational instead of using Firebase
* Allow users to form groups and send tasks to other members of the group
* Set up a notification system, via email if a task is ending

## Recommended Usage
* Preferred usage on smartphone (PC/Laptop/tablets are also okay)
* Use safari or chrome web browser
