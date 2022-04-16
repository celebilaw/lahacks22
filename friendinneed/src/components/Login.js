import { useState, ButtonHTMLAttributes } from 'react'
import * as db from '../config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import GoogleButton from './icons/google-sign-in.svg'
const googleSignIn = () => {
    signInWithPopup(db.auth, db.provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const name = user.displayName;
            const phone = user.phoneNumber
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
const Login = () => {
    return (
        <div>
            <button onClick={googleSignIn}>
                <img src={GoogleButton} alt="google login" />
            </button>
            <p>
                hello
            </p>
        </div>
    )
}
export default Login;