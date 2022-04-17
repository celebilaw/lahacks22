import { useReducer, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import UserProfile from './components/UserProfile.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Navbar from './components/NavBar.js';
import NotFoundPage from './components/NotFoundPage';
import { auth } from'./config';
import {onAuthStateChanged} from 'firebase/auth';

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
          <Route path='/' element={loggedin ? <HomePage /> : <Login /> } />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;