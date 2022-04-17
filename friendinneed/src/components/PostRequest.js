import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import "../css/Navbar.css";
import { auth, db } from '../config.js';
import { collection, Timestamp, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import landmarks from "./places"

// const user = auth.currentUser;
// let name = ''
// if(user){
//     name = user.displayName;
// }
let name, uid, email;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        name = user.displayName;
        uid = user.uid;
        email = user.email;
        // ...
    } else {
        alert('User not logged in!');
        let navigate = useNavigate();
        navigate('/', { replace: true });
        // User is signed out
        // ...
    }
});

const PostRequest = (props) => {

  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    // Do some checks to ensure no blank fields are submitted
    if (item === "" || description === "" || location === "" || urgency === "") {
      return;
    }

    e.preventDefault();
    const docRef = doc(collection(db, "borrowrequests"));
    await setDoc(docRef, {
      id: docRef.id,
      item: item,
      description: description,
      location: location,
      requester: uid,//replace with auth user
      requestername: name,
      requesteremail: email,
      fulfiller: '', //this is an id
      fulfillername: '',
      fulfilleremail: '',
      posted: Timestamp.now(),
      urgency: urgency,
      status: 0
    });
    console.log("Document written with ID: ", docRef.id);//TODO: REMOVE IN PROD

    // Clear form elements when user submits
    setItem("");
    setUrgency("");
    setLocation("");

    // Close new request form when user clicks submit
    document.getElementById("request-form").classList.toggle("show");
    props.fetchData();

    // window.location.reload(true);
  }

  const handleCancel = (e) => {
    // Clear form elements when user cancels
    setItem("");
    setUrgency("");
    setLocation("");
    document.getElementById("request-form").classList.toggle("show");
  }

  const urgencies = ["SOS", "Immediate", "Couple Hours", "Days", "Weeks"]

  return (
    <div>
      <Stack
        id="request-form"
        component="form"
        sx={{
          width: '25ch'
        }}
        spacing={0.5}
        noValidate
        autoComplete="off"
        className="RequestForm"
      >
        <TextField 
          label="Item" 
          variant="outlined" 
          value={item} 
          onChange={(e) => {setItem(e.target.value)}}
        />
        <TextField 
          label="Description" 
          variant="outlined" 
          value={description} 
          onChange={(e) => {setDescription(e.target.value)}} 
        />

        <TextField
          id="UrgencyLabel"
          value={urgency}
          onChange={(e) => {setUrgency(e.target.value)}}
          select
          label="Urgency">
          {urgencies.map(u => <MenuItem value={u} key={u}>{u}</MenuItem>)}
        </TextField>

        <TextField
          id="LocationLabel"
          value={location}
          onChange={(e) => {setLocation(e.target.value)}}
          select
          label="Place">
          {landmarks.map(place => <MenuItem value={place} key={place}>{place}</MenuItem>)}
        </TextField>

        <Button onClick={handleSubmit}>Submit Request</Button>
        <Button onClick={handleCancel}>CANCEL</Button>
      </Stack>
    </div>
  );
}


export default PostRequest;