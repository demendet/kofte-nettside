import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useUser } from '../AuthPage/UserContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { styled } from '@mui/material/styles';


const StyledAppBar = styled(AppBar)({
  backgroundColor: 'main',
  boxShadow: 'none',
  borderBottom: '1px solid #e0dedb',
});

function Header() {
  const { currentUser } = useUser() || {};
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.reload();
    }).catch((error) => {
      console.error("Det oppstod en feil under utlogging:", error);
    });
  };

  const goToAuthPage = () => {
    navigate('/auth');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToHome = () => {
    navigate('/');
  };

  const goToProducts = () => {
    navigate('/products');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToContactUs = () => {
    navigate('/kontakt-oss');
  };

  const goToInstructionalVideos = () => {
    navigate('/videoer');
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box style={{ flex: 1 }}>
          <Typography variant="h6" style={{ fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }} onClick={goToHome}>
          SAMISKE KOFTER/GÁKTI
          </Typography>
        </Box>
        <Box style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Button color="inherit" onClick={goToHome}>
            Hjem
          </Button>
          <Button color="inherit" onClick={goToProducts}>
            Produkter
          </Button>
          <Button color="inherit" onClick={goToInstructionalVideos}>
            Instruksjonsvideoer
          </Button>
          <Button color="inherit" onClick={goToContactUs}>
            Kontakt oss
          </Button>
          <IconButton color="inherit" aria-label="Facebook" href="#">
            <FacebookIcon />
          </IconButton>
        </Box>
        <Box style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {!currentUser ? (
            <>
              <Button startIcon={<PersonAddIcon />} color="inherit" onClick={goToAuthPage}>
                Bli kunde
              </Button>
              <Button startIcon={<LoginIcon />} color="inherit" onClick={goToAuthPage}>
                Logg Inn
              </Button>
            </>
          ) : (
            <>
              <IconButton edge="end" color="inherit" aria-label="account of current user" onClick={handleMenuOpen}>
                <AccountCircleIcon />
                <Typography variant="subtitle1" color="inherit">
                  {currentUser.firstName}
                </Typography>
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Mine ordre</MenuItem>
                <MenuItem onClick={goToDashboard} >Min side</MenuItem>
                <MenuItem onClick={logout}>
                  <LogoutIcon />
                  Logg Ut
                </MenuItem>
              </Menu>
            </>
          )}
          <IconButton edge="end" color="inherit" aria-label="shopping cart" onClick={goToCart}>
            <ShoppingCartIcon />
            <Typography variant="body2" style={{ marginLeft: '5px' }}>
              Handlekurv
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>
      </StyledAppBar>
  );
}

export default Header;