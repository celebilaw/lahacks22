import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../config.js';
import '@fontsource/lato';
import '../css/UserProfile.css';
import CountUp from 'react-countup';
import { Circle } from 'rc-progress';
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
  const [progress, setProgress] = useState(1);
  const [index, setIndex] = useState(0);

  // function fetchUserData() {
  //   getDoc(docRef).then( (docSnap) => {
  //     console.log(“user data:“);
  //     if (docSnap.exists()) {
  //       console.log(“user data:“, docSnap.data());
  //       setProfile(docSnap.data());
  //     } else {
  //       console.log(“bad!“);
  //     }
  //    });
  // }
  useEffect(() => {
    if (!user) return;
    if (user) {
      getDoc(doc(db, 'user-profiles', user.uid)).then(docSnap => {
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          setProfile(docSnap.data());
        } else {
          console.log('No such document!');
        }
      })
    }
  }, [user]);

  useEffect(() => {
    if (progress < 50) {
        setTimeout(() => {
            setProgress(50*Math.tanh(0.01*index))
            setIndex((prev) => {return prev + 1;});
        }, 10);
    }
}, [progress]);

  return (
    <div style={{marginLeft: 100}}>
      <div className='horizontalWrapper'>
        <h1>
          Welcome back,
        </h1>
        <h1 style={{ marginLeft: 10, color: '#477BE8' }}>
           {profile.name}
        </h1>
      </div>
      <div style={{marginLeft: 100, width: '20%'}}>
        {/* <h1>style={{fontWeight: 700, fontSize: 120, color: '#F3C950'}} {profile.items_lended}</h1> */}
        <CountUp style={{fontWeight: 700, fontSize: 120, color: '#F3C950'}} end={profile.items_lended} />
        <h2 style={{fontSize: 20, lineHeight: 0.5}}>
          items lended
        </h2>
      </div>
      <div style={{marginLeft: 100, width: '20%'}}>
        {/* <h1>style={{fontWeight: 700, fontSize: 120, color: '#F3C950'}} {profile.items_borrowed}</h1> */}
        <CountUp style={{fontWeight: 700, fontSize: 120, color: '#477BE8'}} end={profile.items_borrowed} />
        <h2 style={{fontSize: 20, lineHeight: 0.5}}>
          items borrowed
        </h2>
      </div>
      <div style={{width: '40%', marginLeft: '500px', marginBottom: '300px'}}>
        <Circle 
            percent={progress}
            strokeWidth="4" 
            strokeColor="#477BE8" 
            trailColor="#F3C950"
            trailWidth="4"
            gapDegree="150"
            gapPosition="bottom"
        /> 
      </div>
    </div>
  )
}
export default UserProfile;