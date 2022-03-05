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
if (!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig);
}
const app = firebase.app();
const auth = firebase.auth(app);
const db = firebase.firestore(app);

// Get a list of cities from your database
async function getBlogs (db)
{
  const blogsCol = collection(db, 'blogs');
  const blogSnapshot = await getDocs(blogsCol);
  const blogList = blogSnapshot.docs.map(doc => doc.data());
  return blogList;
}

export
{
  auth,
  db,
  getBlogs
};
