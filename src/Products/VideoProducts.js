// VideoProducts.js
import React from 'react';
import { AppBar, Toolbar, Typography, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import VideoCategory from './VideoCategory'; // Create a separate component for video categories
import LuhkkaAI from "../Assets/Images/LuhkkaAI.png";

const categories = [
  {
    title: 'Koftemønster dame',
    videos: [
      { title: 'Video 1', youtubeLink: 'https://www.youtube.com/watch?v=video1' },
      { title: 'Video 2', youtubeLink: 'https://www.youtube.com/watch?v=video2' },
      // Add more videos for women's kofte
    ],
  },
  {
    title: 'Koftemønster menn',
    videos: [
      { title: 'Video 3', youtubeLink: 'https://www.youtube.com/watch?v=video3' },
      { title: 'Video 4', youtubeLink: 'https://www.youtube.com/watch?v=video4' },
      // Add more videos for men's kofte
    ],
  },
  {
    title: 'Koftemønster Luhkka',
    videos: [
      { title: 'Video 5', youtubeLink: 'https://www.youtube.com/watch?v=video5' },
      { title: 'Video 6', youtubeLink: 'https://www.youtube.com/watch?v=video6' },
      // Add more videos for luhkka
    ],
  },
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

// const StyledCard = styled(Card)(({ theme }) => ({
//   backgroundColor: 'transparent',
//   maxWidth: '200px',
//   textAlign: 'center',
//   boxShadow: 'none',
//   margin: '0 15px',
// }));

// const StyledHexagonalImage = styled(CardMedia)(({ theme }) => ({
//   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
//   width: '150px',
//   height: '150px',
// }));

// const ProductWrapper = styled('div')(({ theme }) => ({
//   backgroundColor: '#f7f4e9',
//   padding: '20px 0',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   flexWrap: 'wrap',
// }));

function VideoProducts() {
  return (
    <div className="container">
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h4" style={{ fontWeight: 'bold', color: '#333', marginLeft: 'auto', marginRight: 'auto' }}>
            Kirsti's Kofter Videoguide
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <CardMedia component="img" alt="Header Image" image={LuhkkaAI} style={{ width: '100%', height: '70vh', objectFit: 'cover', borderBottom: '8px solid #e0dedb' }} />

      <div className="video-categories">
        {categories.map((category, index) => (
          <VideoCategory key={index} title={category.title} videos={category.videos} />
        ))}
      </div>
    </div>
  );
}

export default VideoProducts;
