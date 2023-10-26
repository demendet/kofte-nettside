import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
// import MainPage from './MainPage/MainPage';
// import AuthPage from './AuthPage/AuthPage';
// import VideoProducts from './Products/VideoProducts';
// import Dashboard from './DashBoard/Dashboard.js';
import ComingSoon from './components/ComingSoon/ComingSoon';
import PageNotFound from './components/PageNotFound/PageNotFound';



import { UserProvider } from './AuthPage/UserContext';
import Header from './GlobalComponents/Header'; // Import the Header component
import Footer from './GlobalComponents/Footer'; // Import the Footer component

function Content() {
  const location = useLocation();
  
  // A list of valid routes where you want the header and footer to be displayed.
  const validRoutes = ["/auth", "/videoer", "/dashboard"];
  
  const showHeaderFooter = validRoutes.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      
      <div style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Routes>
          <Route path="/" element={<ComingSoon />} />
          {/* Uncomment other routes when the site is ready */}
          {/* 
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/videoer" element={<VideoProducts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      
      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;