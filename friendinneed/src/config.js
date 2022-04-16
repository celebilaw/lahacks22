// Import the functions you need from the SDKs you need
// import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyArarzmzNg3mU5MVBHWrDpCBzdrtUyboZw",
  authDomain: "friend-in-need-a2242.firebaseapp.com",
  projectId: "friend-in-need-a2242",
  storageBucket: "friend-in-need-a2242.appspot.com",
  messagingSenderId: "832465345352",
  appId: "1:832465345352:web:9b9e4cc0e188e64d71317d",
  measurementId: "G-9HM5 PLDX2P"
};
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const db = getFirestore(app);