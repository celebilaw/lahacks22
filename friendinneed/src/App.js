import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './components/HomePage'
import * as db from './config'
import UserProfile from "./components/UserProfile.js";
import MainPage from "./components/MainPage.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Navbar from "./components/NavBar.js";

function App() {
  //const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={0 ? <MainPage /> : <Login /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
