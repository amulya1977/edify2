import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu1HPi7lVyITXV-m0DS2cNJ59g27Vs5ec",
  authDomain: "edify-frontend.firebaseapp.com",
  projectId: "edify-frontend",
  storageBucket: "edify-frontend.appspot.com", // ✅ Fixed storageBucket
  messagingSenderId: "308127014368",
  appId: "1:308127014368:web:5d1fea56a4701673c29f85",
  measurementId: "G-WMK1GLZ5CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Passed `app` inside `getAuth`
export const db=getFirestore(app);

export { app, auth }; // ✅ Correctly exporting `app` and `auth`
