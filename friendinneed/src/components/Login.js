import GoogleButton from './icons/google-sign-in.svg';
import WelcomeLogo from './icons/welcome.svg';
import "../css/Login.css";
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
const Login = () => {
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