import firebase from "firebase";
import "firebase/auth";

/**
 * This is the place where you should put firebase related code
 */

const firebaseConfig = {
    apiKey: "AIzaSyAQjnwkPnwdKTvtqHP7nyYt4ZuKfmXjJb0",
    authDomain: "todo-1757e.firebaseapp.com",
    databaseURL: "https://todo-1757e.firebaseio.com",
    projectId: "todo-1757e",
    storageBucket: "todo-1757e.appspot.com",
    messagingSenderId: "657878982142",
    appId: "1:657878982142:web:33960222aad64710d8b4af",
    measurementId: "G-TP6TKCSNE9"
  };

// Initialize firebase
if (!firebase.apps.length) {
    console.log("[Message] Initialize firebase app")
    firebase.initializeApp(firebaseConfig);
}

// Get current user, but if you want to change the user state, please pass setUser in App.js to your component
const getUser = () => {
    return firebase.auth().currentUser
}

// Change the user state when user logged in or logged out
const updateUserState = (setUser) => {
    firebase.auth().onAuthStateChanged(setUser);
}

// Sign out the user
const signOut = () => {
    firebase.auth().signOut()
}

// Sign in with google with a popup window
const signInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

export { getUser, signOut, signInWithGoogle, updateUserState}