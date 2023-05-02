// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDaSM6uZ3hhwIJVSH8_fOYk-oe__ePmw6A",
  authDomain: "ecommerceapp-4ff01.firebaseapp.com",
  projectId: "ecommerceapp-4ff01",
  storageBucket: "ecommerceapp-4ff01.appspot.com",
  messagingSenderId: "811896498752",
  appId: "1:811896498752:web:43469332d9bba88f1d4da5",
  measurementId: "G-Q4Y132BQEL"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;