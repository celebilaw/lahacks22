import { useReducer, useState, createContext } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import { getDocs, collection, where, query } from "firebase/firestore";
import './App.css';

import HomePage from './components/HomePage'
import UserProfile from './components/UserProfile.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Navbar from './components/NavBar.js';
import NotFoundPage from './components/NotFoundPage';
import MyRequests from './components/MyRequests';
import { auth } from'./config';
import {onAuthStateChanged} from 'firebase/auth';
import { db } from "./config";
import AboutUs from './components/AboutUs';

function App() {
  let uid;
  let [loggedin, setLoggedin] = useState(0);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      uid = user.uid;
      setLoggedin(1);
      // ...
    } else {
    }
  });

  const [borrowReqs, setBorrowReqs] = useState([]);

  async function fetchData() {
    const q = query(collection(db, "borrowrequests"), where("status", "==", 0));// add perhaps where("owner", "!=", uid)
    const querySnapshot = await getDocs(q);
    setBorrowReqs(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    })));
  }

  return (
    <HashRouter>
      <div>
        <Navbar fetchData={fetchData}/>
        <Routes>
          <Route path='/' element={loggedin ? <HomePage fetchData={fetchData} borrowReqs={borrowReqs} /> : <Login /> } />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/my-requests' element={<MyRequests fetchData={fetchData} borrowReqs={borrowReqs} />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;