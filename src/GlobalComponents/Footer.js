import React from 'react';
import { Container, Typography, Box, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import PaymentIcon from '@mui/icons-material/Payment';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1C3144', // A color inspired by Sami traditional looks
        color: '#FFFFFF',
        padding: '2rem',
        fontFamily: 'Poppins, sans-serif', // A modern and distinctive font
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Om oss</Typography>
            <Typography>
              Vi spesialiserer oss på å tilby de fineste Sami kofte.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Hjelp</Typography>
            <Typography>
              Har du spørsmål? Besøk vår hjelpeseksjon eller kontakt oss.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Kontakt oss</Typography>
            <IconButton color="inherit" aria-label="Facebook" href="#">
              <FacebookIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box
          sx={{
            marginTop: '2rem',
            borderTop: '1px solid #FFFFFF',
            padding: '1rem 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography>&copy; 2023 SAMISKE KOFTER/GÁKTI</Typography>
          <PaymentIcon color="inherit" /> {/* Add your payment method icons here */}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
