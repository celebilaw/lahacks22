import GoogleButton from './icons/google-sign-in.svg';
import WelcomeLogo from './icons/welcome.svg';
import "../css/Login.css";
import {db} from '../config';
import Container from '@mui/material/Container';
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
import {auth, provider} from'../config.js';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
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
                const docRef = addDoc(collection(db, "user-profiles"), {
                    uid: user.uid,
                    name: user.displayName,
                    items_lended: 0,
                    items_borrowed: 0,
                    email: user.email
                });
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
                console.error({errorCode, errorMessage})
            });
        }
    return (
        <Container maxwidth="xl">
            <img className="welcomeImage" src={WelcomeLogo} alt="Main Welcome Symbol"/>
            <div className="rightContainer">
                <h2 className="welcome">
                    Welcome
                </h2>
                <p className="description">
                    Friend in Need is a community-based app to foster communal wellness 
                    and make students’ daily lives easier.
                </p>
                <img className="googleButton" src={GoogleButton} alt="google"/>
            </div>
        </Container>
    )
}
export default Login;