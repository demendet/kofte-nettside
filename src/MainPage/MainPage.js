import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { AppBar, Toolbar, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import BackGroundImageMain from "../Assets/Images/BackGroundImageMain.png";
import VideoerAI from "../Assets/Images/VideoerAI.png";
import DameKofteAI from "../Assets/Images/DameKofteAI.png";
import HerreKofteAI from "../Assets/Images/HerreKofteAI.png";
import LuhkkaAI from "../Assets/Images/LuhkkaAI.png";

const products = [
  { name: 'Koftemønster Herre', description: 'En tradisjonell design med et moderne preg.', image: HerreKofteAI, route: '/herre-kofte' },
  { name: 'Koftemønster dame', description: 'En elegant plagg som kombinerer stil med komfort.', image: DameKofteAI, route: '/dame-kofte' },
  { name: 'Luhkkamønster', description: 'Inspirert av gamle mønstre, men reimagined for i dag.', image: LuhkkaAI, route: '/luhkka' },
  { name: 'Instruksjonsvideoer', description: 'Lær å lage din egen kofte med våre instruksjonsvideoer.', image: VideoerAI, route: '/videoer' }
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'transparent',
  maxWidth: '200px',
  textAlign: 'center',
  boxShadow: 'none',
  margin: '0 15px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '10px',
  border: '2px solid #000',
  color: '#000',
  '&:hover': {
    backgroundColor: '#d6cfbb',
  },
}));

const StyledHexagonalImage = styled(CardMedia)(({ theme }) => ({
  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  width: '150px',
  height: '150px',
}));

const ProductWrapper = styled('div')(({ theme }) => ({
  backgroundColor: '#f7f4e9',
  padding: '20px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

function MainPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const goToVideoer = (route) => {
    navigate(route); // Use navigate to go to the specified route
  };

  return (
    <div className="container">
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h4" style={{ fontWeight: 'bold', color: '#333', marginLeft: 'auto', marginRight: 'auto' }}>
            Kirsti's Kofte
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <CardMedia component="img" alt="Header Image" image={BackGroundImageMain} style={{ width: '100%', height: '70vh', objectFit: 'cover', borderBottom: '8px solid #e0dedb' }} />

      <div className="product-section">
        <Typography variant="h4" style={{ textAlign: 'center', margin: '40px 0' }}>
          Våre Produkter
        </Typography>
        <ProductWrapper>
          {products.map((product, index) => (
            <StyledCard key={index}>
              <StyledHexagonalImage component="img" alt={product.name} image={product.image} />
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography>{product.description}</Typography>
                <StyledButton variant="outlined" onClick={() => goToVideoer(product.route)}>SE MER</StyledButton>
              </CardContent>
            </StyledCard>
          ))}
        </ProductWrapper>
      </div>
    </div>
  );
}

export default MainPage;
