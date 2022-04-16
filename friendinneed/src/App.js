import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './components/HomePage'

import UserProfile from "./components/UserProfile.js";
import MainPage from "./components/MainPage.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Navbar from "./components/NavBar.js";

// Import the functions you need from the SDKs you need
// import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyArarzmzNg3mU5MVBHWrDpCBzdrtUyboZw",
  authDomain: "friend-in-need-a2242.firebaseapp.com",
  projectId: "friend-in-need-a2242",
  storageBucket: "friend-in-need-a2242.appspot.com",
  messagingSenderId: "832465345352",
  appId: "1:832465345352:web:9b9e4cc0e188e64d71317d",
  measurementId: "G-9HM5 PLDX2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);
// async function test () {
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
// }

function App() {
  //const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={1 ? <MainPage /> : <Login /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
