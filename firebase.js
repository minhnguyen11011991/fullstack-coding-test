import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_wcUThjvSIXoK4d2SITQ3ZPitmNsGjr8",
  authDomain: "fullstack-coding-test-0304.firebaseapp.com",
  projectId: "fullstack-coding-test-0304",
  storageBucket: "fullstack-coding-test-0304.appspot.com",
  messagingSenderId: "825132614012",
  appId: "1:825132614012:web:df865ee6ecdea5a10ce4f9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
export { auth, db, app };