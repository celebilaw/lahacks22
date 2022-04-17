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
import "@fontsource/lato";
import "../css/Navbar.css";
import YellowButton from './YellowButton';

const Navbar = () => {

    const handleNewRequest = (e) => {
        document.getElementById("request-form").classList.toggle("show");
    }

    return (
        <div>
            <PostRequest />
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
                            <Link className='navTitle' to='/'>friend </Link>
                            <Link className='navTitle2' to='/'> in </Link>
                            <Link className='navTitle' to='/'> need</Link>
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button variant="text">
                                <Link className="navLink" color="inherit" to="/login" >User Profile</Link>
                            </Button>
                            <Button variant="text">
                                <Link className="navLink" color="inherit" to="/about" >About Us</Link>
                            </Button>
                            {/* <Button variant="contained" onClick={handleNewRequest} 
                                style={{ 
                                    textTransform: 'none', 
                                    backgroundColor: '#fcc200', 
                                    fontFamily: 'Patua One',
                                    fontSize: 20,
                                }}>
                                <txt color="inherit">Request an Item</txt>
                            </Button> */}
                            <YellowButton text={"Request an Item"}/>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}
export default Navbar;