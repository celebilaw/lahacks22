import { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../config.js';
import CountUp from 'react-countup';
import ProgressProvider from './progress bar/ProgressProvider';

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
      if (user){
        getDoc(doc(db, "user-profiles", user.uid)).then(docSnap => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setProfile(docSnap.data());
          } else {
            console.log("No such document!");
          }
        })}
    }, [user]);


  return (
    <div>
      <p>
        Welcome back, {profile.name}
      </p>
      {/* <CountUp end={profile.items_borrowed} duration={5} /> */}
      
      {/* <CountUp end={profile.items_lended} /> */}
      <h1>
        <CountUp end={100} duration={5} useEasing={true} />
        items lended: {profile.items_lended}
      </h1>
      <h1>
        items borrowed: {profile.items_borrowed}
      </h1>
    </div>
  )
}

export default UserProfile;