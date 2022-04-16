import HomePage from './HomePage';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const MainPage = () => {
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
            <div>
                <p>
                    {loggedin ? 'yes i am logged in': 'no i am not'}
                </p>
            <HomePage />
            </div>
        )
}

export default MainPage;