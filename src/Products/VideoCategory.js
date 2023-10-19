// VideoCategory.js
import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import VideoerAI from "../Assets/Images/VideoerAI.png";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'transparent',
  maxWidth: '200px',
  textAlign: 'center',
  boxShadow: 'none',
  margin: '0 15px',
}));

const StyledHexagonalImage = styled(CardMedia)(({ theme }) => ({
  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  width: '150px',
  height: '150px',
}));

const CategoryWrapper = styled('div')(({ theme }) => ({
  backgroundColor: '#f7f4e9',
  padding: '20px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

function VideoCategory({ title, videos }) {
  return (
    <CategoryWrapper>
      <Typography variant="h4" style={{ textAlign: 'center', margin: '20px 0' }}>
        {title}
      </Typography>
      {videos.map((video, index) => (
        <StyledCard key={index}>
          <StyledHexagonalImage component="img" alt={video.title} image={VideoerAI} />
          <CardContent>
            <Typography variant="h5">{video.title}</Typography>
            {/* Add video description if available */}
          </CardContent>
          <a href={video.youtubeLink} target="_blank" rel="noopener noreferrer">
            Watch Video
          </a>
        </StyledCard>
      ))}
    </CategoryWrapper>
  );
}

export default VideoCategory;
