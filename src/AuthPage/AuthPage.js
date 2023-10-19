import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f50b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const generateUniqueBrukerId = () => {
  // Implement a function to generate a unique "Bruker ID" (e.g., a random number)
  // You can use a library like 'uuid' or any method you prefer.
  // Ensure it's unique for each user.
  return Math.floor(Math.random() * 90000) + 10000; // Generate a 5-digit random number
};

const AuthPage = () => {
  const auth = getAuth();
  const db = getFirestore();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    postalCode: "",
    city: "",
    newsletter: false
  });

  // const blurStyle = {
  //   backdropFilter: loading || success !== null ? 'blur(4px)' : 'none',
  //   pointerEvents: loading || success !== null ? 'none' : 'auto',
  // };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent' // Modified this to transparent
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: finalValue,
    });
  };

  useEffect(() => {
    if (success) {
      setMessage("Omdirigerer til hovedsiden...");
      setTimeout(() => navigate('/'), 1500);  // Omdiriger etter 2 sekunder
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, password, firstName, lastName, address, phone, postalCode, city, newsletter } = formData;

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Logget inn");
        setSuccess(true);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const brukerId = generateUniqueBrukerId(); // Generate a unique "Bruker ID"
        await setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          address,
          phone: `+47${phone}`,
          postalCode,
          city,
          newsletter,
          brukerId, // Store the generated "Bruker ID"
          createdAt: serverTimestamp(),
        });
        setMessage("Registrert");
        setSuccess(true);
      }
    } catch (error) {
      console.error(error.code);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setMessage("E-post er allerede i bruk");
          break;
        case 'auth/invalid-login-credentials':
          setMessage("Ugyldig e-postadresse eller passord");
          break;
        case 'auth/weak-password':
          setMessage("Passordet er for svakt");
          break;
        default:
          setMessage("En ukjent feil oppstod, prøv igjen");
          break;
      }
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Overlay */}
      {(loading || success !== null) && (
        <div style={overlayStyle}>
          <div className="info-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading && <CircularProgress size={80} />}
            {success === true && <CheckIcon style={{ color: 'green', fontSize: 80 }} />}
            {success === false && <ClearIcon style={{ color: 'red', fontSize: 80 }} />}
          </div>
          <p className="overlay-message">{message}</p>
          {success === false && <button className="retry-button" onClick={() => setSuccess(null)}>Prøv igjen</button>}
        </div>
      )}
      <ThemeProvider theme={theme}>
      <Container 
  component="main" 
  maxWidth="xs"
  className={(loading || success !== null) ? 'blur-out' : ''}
>
          <CssBaseline />
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar style={{ margin: '1rem', backgroundColor: theme.palette.secondary.main }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? 'Logg Inn' : 'Registrer'}
            </Typography>
            <form style={{ width: '100%', marginTop: '2rem' }} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                {!isLogin && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField name="firstName" variant="outlined" required fullWidth label="Fornavn" autoFocus value={formData.firstName} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField name="lastName" variant="outlined" required fullWidth label="Etternavn" value={formData.lastName} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="address" variant="outlined" required fullWidth label="Adresse" value={formData.address} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="postalCode" variant="outlined" required fullWidth label="Postnummer" value={formData.postalCode} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="city" variant="outlined" required fullWidth label="By" value={formData.city} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="phone" variant="outlined" required fullWidth label="Telefonnummer" value={formData.phone} onChange={handleChange} />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField name="email" variant="outlined" required fullWidth label="E-post" value={formData.email} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="password" variant="outlined" required fullWidth label="Passord" type="password" value={formData.password} onChange={handleChange} />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" style={{ margin: '2rem 0 1rem' }}>
                {isLogin ? 'Logg Inn' : 'Registrer'}
              </Button>
            </form>
            <p>
              {isLogin ? 'Ny bruker?' : 'Har allerede en konto?'}
              <span onClick={() => setIsLogin(!isLogin)} className="toggle-text" style={{ color: 'blue', cursor: 'pointer' }}>
                {isLogin ? ' Registrer deg her' : ' Logg inn her'}
              </span>
            </p>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AuthPage;
