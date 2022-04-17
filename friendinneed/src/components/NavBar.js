import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Logo from '../components/icons/logo.svg';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import PostRequest from './PostRequest';
import '@fontsource/patua-one';
import '@fontsource/lato';
import "../css/Navbar.css";
import YellowButton from './YellowButton';
import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { db,auth, provider } from '../config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { borrowReqContext } from "../App";

const Navbar = (props) => {
    // let uid;
     let [loggedin, setLoggedin] = useState(1);
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     uid = user.uid;
    //     setLoggedin(1);
    //     // ...
    //     } else {
    //     }
    // });

    // let navigate = useNavigate();
    // const signInWithGoogle = () => {
    //     // const navigate = useNavigate();
    //     signInWithPopup(auth, provider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;
    //             // The signed-in user info.
    //             const user = result.user;
    //             const docuRef = doc(db, "user-profiles", user.uid);


    //             getDoc(docuRef).then(docSnap => {
    //                 if (docSnap.exists()) {
    //                   console.log("Document data:", docSnap.data());
    //                 } else {
    //                     const docRef = setDoc(doc(db, "user-profiles", user.uid), {
    //                         uid: user.uid,
    //                         name: user.displayName,
    //                         items_lended: 0,
    //                         items_borrowed: 0,
    //                         email: user.email
    //                     });
    //                 }
    //               })
               
    //             navigate('/', { replace: true });
    //         }).catch((error) => {
    //             // Handle Errors here.
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user’s account used.
    //             const email = error.email;
    //             // The AuthCredential type that was used.
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //             // ...
    //             console.error({ errorCode, errorMessage })
    //         });
    // }

    const handleNewRequest = (e) => {
        document.getElementById("request-form").classList.toggle("show");
    }
    return (
        <div>
            <PostRequest fetchData={props.fetchData} />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ background: 'white' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="logo"
                            sx={{ mr: 2 }}
                        >
                            <Link className='navTitle' to='/'
                            >
                            <img src={Logo} style={{ width: 50 }} alt="logo"></img>
                            </Link>
                            
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link className='navTitle' to='/'>friend </Link>
                            <Link className='navTitle2' to='/'> in </Link>
                            <Link className='navTitle' to='/'> need</Link>
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            {loggedin && 
                            <Button variant="text">
                                <Link className="navLink" color="inherit" to="/about" >About Us</Link>
                            </Button>
                            }
                            {loggedin &&
                                <Button variant="text">
                                    <Link className="navLink" color="inherit" to="/user-profile" >User Profile</Link>
                                </Button>
                            }
                            {loggedin && 
                                <Button variant="text">
                                    <Link className="navLink" color="inherit" to="/my-requests" >My Requests</Link>
                                </Button>
                            }
                            <YellowButton text={loggedin ? "Request an Item" : "Sign in"} variant="contained" onClick={loggedin ? handleNewRequest : handleNewRequest}/>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}
export default Navbar;