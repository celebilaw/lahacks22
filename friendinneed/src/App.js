import { useReducer, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MainPage from './components/MainPage'
import UserProfile from "./components/UserProfile.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Navbar from "./components/NavBar.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function App() {
  let [loggedin, setLoggedin] = useState(0);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setLoggedin(1);
      // ...
    } else {
    }
  });


  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={loggedin ? <MainPage /> : <Login /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
