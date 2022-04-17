import { useState, useEffect } from 'react'
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../config.js';
import '@fontsource/lato';

import '../css/UserProfile.css';
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // const uid = user.uid;
    // ...
  } else {
    let navigate = useNavigate();
    navigate('/', { replace: true });
    // User is signed out
    // ...
  }
});


//const load = await getDoc
const UserProfile = () => {
  const user = auth.currentUser;
  const [profile, setProfile] = useState({});

  // function fetchUserData() {
  //   getDoc(docRef).then( (docSnap) => {
  //     console.log("user data:");

  //     if (docSnap.exists()) {
  //       console.log("user data:", docSnap.data());
  //       setProfile(docSnap.data());
  //     } else {
  //       console.log("bad!");
  //     }
  //    });
  // }
  useEffect(() => {
    if (!user) return;
    if (user) {
      getDoc(doc(db, "user-profiles", user.uid)).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setProfile(docSnap.data());
        } else {
          console.log("No such document!");
        }
      })
    }
  }, [user]);


  return (
    <div>
      <div className="horizontalWrapper">
        <h1>
          Welcome back,
        </h1>
        <h1 style={{ marginLeft: 20, color: '#477be8' }}>
           {profile.name}
        </h1>
      </div>
      <div className="horizontalWrapper">
        <h1>
          items lended: 
        </h1>
        <h1 className="bigText" style={{ marginLeft: 20, color: '#f3c950' }}>
            {profile.items_lended}
        </h1>
      </div>
      <div className="horizontalWrapper">
        <h1>
          items borrowed: 
        </h1>
        <h1 className="bigText" style={{ marginLeft: 20, color: '#477be8' }}>
            {profile.items_borrowed}
        </h1>
      </div>
    </div>
  )
}

export default UserProfile;