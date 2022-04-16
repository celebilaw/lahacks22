import GoogleButton from './icons/google-sign-in.svg';
import {auth, provider} from'../config';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
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
                const name = result.user.displayName;
                console.log(name);
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
        <div>
            <IconButton onClick={signInWithGoogle}>
                <img src={GoogleButton} alt='google login' style={{width:400}}></img>
            </IconButton>
            <p>
                hello
            </p>
        </div>
    )
}
export default Login;