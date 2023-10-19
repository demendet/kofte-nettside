import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import AuthPage from './AuthPage/AuthPage';
import VideoProducts from './Products/VideoProducts';

import Dashboard from './DashBoard/Dashboard.js';

import { UserProvider } from './AuthPage/UserContext';
import Header from './GlobalComponents/Header'; // Import the Header component
import Footer from './GlobalComponents/Footer'; // Import the Footer component

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        
        <Header />
        
        {/* Wrap the Routes in a div to manage the footer placement */}
        <div style={{ minHeight: 'calc(100vh - 200px)' }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/videoer" element={<VideoProducts />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other Routes here */}
          </Routes>
        </div>
        
        
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
