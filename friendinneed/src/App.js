import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './components/HomePage'

import UserProfile from "./components/user-profile.js";
import MainPage from "./components/main-page.js";
import Login from "./components/login.js";
import Register from "./components/register.js";
import Navbar from "./components/navbar.js";

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#avai lable-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            {/* {user ? <ChatRoom /> : <SignIn /> } */}
          {/* 
            probably do userprofile by ID? 
            /userProfile/:id
          */}
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
