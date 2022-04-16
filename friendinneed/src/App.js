import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './components/HomePage'

import UserProfile from "./components/user-profile.js";
import MainPage from "./components/main-page.js";
import Login from "./components/login.js";
import Register from "./components/register.js";
import Navbar from "./components/navbar.js";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
