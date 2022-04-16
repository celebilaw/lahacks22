import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Logo from './icons/logo.svg';
import '../css/Navbar.css';
import '@fontsource/patua-one';
const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' style={{ background: 'white' }}>
                <Toolbar>
                    <IconButton
                        // size='large'
                        // edge='start'
                        // color='inherit'
                        // aria-label='logo'
                        // sx={{ mr: 5 }}
                    >
                        <Link to='/'>
                        <img src={Logo} alt='logo' style={{width: 50}}/>
                        </Link>
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                            <Link className='navTitle' to='/' style={{color: '#337DEF' , fontFamily: 'Patua One'}}>friend in need</Link>
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        <Button variant='text'>
                            <Link className='navLink' color='inherit' to='/about'>About Us</Link>
                        </Button>
                        <Button variant='contained' style={{ backgroundColor: '#FCC200' }}>
                            <Link className='navLink' color='inherit' to='/register'>Request an Item</Link>
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default Navbar;