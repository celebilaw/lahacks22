import GoogleButton from './icons/google-sign-in.svg';
import WelcomeLogo from './icons/welcome.svg';
import "../css/Login.css";
import {db} from '../config';
import Container from '@mui/material/Container';
import '@fontsource/lato';
import GoogleButton1 from './GoogleButton1';
import { auth, provider } from '../config.js';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
const Login = () => {
    let navigate = useNavigate();
    const signInWithGoogle = () => {
        // const navigate = useNavigate();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const docuRef = doc(db, "user-profiles", user.uid);


                getDoc(docuRef).then(docSnap => {
                    if (docSnap.exists()) {
                      console.log("Document data:", docSnap.data());
                    } else {
                        const docRef = setDoc(doc(db, "user-profiles", user.uid), {
                            uid: user.uid,
                            name: user.displayName,
                            items_lended: 0,
                            items_borrowed: 0,
                            email: user.email
                        });
                    }
                  })
               
                navigate('/', { replace: true });
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user’s account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.error({ errorCode, errorMessage })
            });
    }
    return (
        <Container maxwidth="xl">
            <img className="welcomeImage" src={WelcomeLogo} alt="Main Welcome Symbol" />
            <div className="rightContainer">
                <h2 className="welcome">
                    Welcome
                </h2>
                <p className="description">
                    Friend in Need is a community-based app to foster communal wellness
                    and make students’ daily lives easier.
                </p>
                {/* <img className="googleButton" src={GoogleButton} alt="google" /> */}
                <GoogleButton1 onClick={signInWithGoogle} className="googleButton"/>
            </div>
        </Container>
    )
}
export default Login;