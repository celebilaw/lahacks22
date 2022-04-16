import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import "../css/Navbar.css";
import PostRequest from './PostRequest';

const Navbar = () => {

    const handleNewRequest = (e) => {
        document.getElementById("request-form").classList.toggle("show");
    }

    return (
        <div>
            <PostRequest />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="logo"
                            sx={{ mr: 2 }}
                        >
                            {/* friendInNeed Logo */}
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Button variant="text">
                                <Link className="navLink navTitle" to="/">friend in need</Link>
                            </Button>
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button variant="text">
                                <Link className="navLink" color="inherit" to="/login">About Us</Link>
                            </Button>
                            <Button variant="contained" style={{ backgroundColor: "#fcc200" }} onClick={handleNewRequest}>
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