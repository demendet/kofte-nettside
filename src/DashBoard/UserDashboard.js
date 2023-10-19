import React, { useContext } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useUser } from '../AuthPage/UserContext'; // Import the useUser hook

function UserDashboard() {
  const { currentUser } = useUser(); // Fetch the currentUser from the context

  return (
    <Box>
      <Typography variant="h6" gutterBottom>User Dashboard</Typography>
      {currentUser ? (
        <>
          <Typography variant="body1">Welcome, user {currentUser.firstName}!</Typography>
          {currentUser.brukerId && (
            <Typography variant="body2">Bruker ID: {currentUser.brukerId}</Typography>
          )}
        </>
      ) : (
        <Typography variant="body1">Welcome, regular user!</Typography>
      )}
    </Box>
  );
}

export default UserDashboard;
