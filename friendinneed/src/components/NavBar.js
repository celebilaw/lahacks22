import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Logo from '../components/icons/logo.svg';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import '@fontsource/patua-one';
import "../css/Navbar.css";
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config.js';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
// const user = auth.currentUser;
// let name = ''
// if(user){
//     name = user.displayName;
// }
let name, uid;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        name = user.displayName;
        uid = user.uid;
        // ...
    } else {
        alert('User not logged in!');
        let navigate = useNavigate();
        navigate('/', { replace: true });
        // User is signed out
        // ...
    }
});

const Navbar = () => {

    let [item, setItem] = useState("");
    let [description, setDescription] = useState("");
    let [urgency, setUrgency] = useState("");
    let [loc, setLoc] = useState("");

    const handleNewRequest = (e) => {
        document.getElementById("request-form").classList.toggle("show");
    }

    const handleItemChange = (e) => {
        setItem(e.target.value);
    }

    const handleDescChange = (e) => {
        setDescription(e.target.value);
    }

    const handleUrgencyChange = (e) => {
        setUrgency(e.target.value);
    }

    const handleLocChange = (e) => {
        setLoc(e.target.value);
    }

    const handleSubmit = async (e) => {
        // Do some checks to ensure no blank fields are submitted
        if (item === "" || description === "" || loc === "" || urgency === "") {
            alert('Please fill out all details!');
            return;
        }

        e.preventDefault();
        const docRef = await addDoc(collection(db, "borrowrequests"), {
            title: item,
            desc: description,
            location: loc,
            requester: name,//replace with auth user
            posted: Timestamp.now(),
            priority: urgency,
            owner: uid,
            fulfiller: '',
            status: 0
        });
        console.log("Document written with ID: ", docRef.id);//TODO: REMOVE IN PROD

        // Clear form elements when user submits
        setItem("");
        setUrgency("");
        setLoc("");

        // Close new request form when user clicks submit
        document.getElementById("request-form").classList.toggle("show");
    }

    const handleCancel = (e) => {
        // Clear form elements when user cancels
        setItem("");
        setUrgency("");
        setLoc("");
        document.getElementById("request-form").classList.toggle("show");
    }

    const urgencies = ["SOS", "Immediate", "Couple Hours", "Days", "Weeks"]
    const landmarks = ["Powell", "YRL", "Sproul", "Delta Terrace", "Sunset Village", "Rieber", "De Neve", "Olympic", "Centennial", "Ackerman", "Court of Sciences", "Inverted Fountain"].sort() // Sort by alphabetical order

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
                <TextField label="Item" variant="outlined" value={item} onChange={handleItemChange} />
                <TextField label="Description" variant="outlined" value={description} onChange={handleDescChange} />

                <TextField
                    id="UrgencyLabel"
                    value={urgency}
                    onChange={handleUrgencyChange}
                    select
                    label="Urgency">
                    {urgencies.map(u => <MenuItem value={u} key={u}>{u}</MenuItem>)}
                </TextField>

                <TextField
                    id="LocationLabel"
                    value={loc}
                    onChange={handleLocChange}
                    select
                    label="Place">
                    {landmarks.map(place => <MenuItem value={place} key={place}>{place}</MenuItem>)}
                </TextField>

                <Button onClick={handleSubmit}>Submit Request</Button>
                <Button onClick={handleCancel}>CANCEL</Button>
            </Stack>

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
                            <img src={Logo} style={{ width: 50 }} alt="logo"></img>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link className='navTitle' to='/'>friend in need</Link>
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button variant="text">
                                <Link className="navLink" color="inherit" to="/login" >User Profile</Link>
                            </Button>
                            <Button variant="text">
                                <Link className="navLink" color="inherit" to="/login" >About Us</Link>
                            </Button>
                            <Button variant="contained" onClick={handleNewRequest} 
                                style={{ 
                                    textTransform: 'none', 
                                    backgroundColor: '#fcc200', 
                                    fontFamily: 'Patua One',
                                    fontSize: 20,
                                }}>
                                <txt color="inherit">Request an Item</txt>
                            </Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}
export default Navbar;