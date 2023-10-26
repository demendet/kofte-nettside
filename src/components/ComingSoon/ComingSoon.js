import React, { useState } from 'react';
import './ComingSoon.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import '@fontsource/open-sans';  // For general text
import '@fontsource/montserrat'; // For headings
import { db } from '../../firebase'; 
import { collection, addDoc } from 'firebase/firestore';




function ComingSoon() {
    const [email, setEmail] = useState('');
    const facebookGroupURL = 'https://www.facebook.com/groups/609050709227786';

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            alert('Vennligst oppgi en gyldig e-postadresse.');
            return;
        }
        try {
          const colRef = collection(db, 'comingsoonemails');
          await addDoc(colRef, { email, timestamp: new Date() });
          setEmail(''); 
          alert('Takk! Vi vil sende varsel når nettsiden blir tilgjengelig'); // Gi beskjed til brukeren
        } catch (error) {
          console.error("Det oppstod en feil:", error);
          alert('Vennligst prøv igjen senere.');
        }
     };
     

    return (
      <div className="coming-soon-container">
        <div className="background-blur"></div>
        <div className="main-content">
          <h1>DEN NYE NETTSIDEN VÅR KOMMER SNART.</h1>
          <h2>DUODJEOAHPPU</h2>

          <div className="email-container">
            <input 
              type="email" 
              placeholder="Skriv inn din e-post her *" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubmit}>Varsle meg!</button>
          </div>

          <div className="content-box center-text">
            <h1 className="contact-text">Kontakt oss mens du venter</h1>
            <h1 className="email">Besøk vår Facebook-side for å komme i kontakt med oss</h1>
            <div>
    <a href={facebookGroupURL} target="_blank" rel="noopener noreferrer" className="facebook-link">
        <FacebookIcon className="facebook-icon" />
    </a> 
    <h3 className="email">E-post: kontakt@duodjeoahppu.no</h3>
</div>

          </div>
        </div>
      </div>
    );
}

export default ComingSoon;