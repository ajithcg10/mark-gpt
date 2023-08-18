// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBBOzTLvXM22bEpjBRiw71U09LhsU0No0",
  authDomain: "markgpt-27329.firebaseapp.com",
  projectId: "markgpt-27329",
  storageBucket: "markgpt-27329.appspot.com",
  messagingSenderId: "120505226180",
  appId: "1:120505226180:web:4dc4bdc5e66e39bdd78a91",
  measurementId: "G-Y4X5DPHDC4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Provider = new GoogleAuthProvider();
export { auth, Provider };
