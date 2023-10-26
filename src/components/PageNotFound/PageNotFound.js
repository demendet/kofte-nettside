import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import './PageNotFound.css';

const PageNotFound = () => {
  // Your Facebook group URL
  const facebookGroupURL = 'https://www.facebook.com/groups/609050709227786';

  return (
    <div className="notfound-container">
      {/* Snowflakes */}
      {[...Array(50)].map((_, idx) => (
        <div key={idx} className="snowflake" style={{ left: `${Math.random() * 100}vw`, animationDelay: `${Math.random() * 10}s` }}></div>
      ))}

      <div className=" center-text">
        <h1 className="error-text number">404</h1>
        <p className="error-text message">Siden ikke funnet</p>
        <p className="error-text message">Det ser ut som om du har mistet tråden. La oss sy deg tilbake til hovedsiden!</p>

        <Link to="/" className="home-button">Tilbake til hovedsiden</Link>
        
        {/* Link to your Facebook group */}
        <h2 className="kontakt-text">Kontakt oss her!</h2>
        <h3 className="email">kontakt@duodjeoahppu.no</h3>
        <h3 className="facebook-text">Eller besøk vår facebook gruppe</h3>
        <a href={facebookGroupURL} target="_blank" rel="noopener noreferrer" className="facebook-link">
          
          <FacebookIcon className="facebook-icon"/>
        </a>
      
      </div>
    </div>
  );
}

export default PageNotFound;
