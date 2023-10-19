// src/PaymentSystem/KlarnaCheckout.js

import React, { useEffect } from 'react';

const KlarnaCheckout = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://x.klarnacdn.net/kp/lib/v1/api.js';
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
            // Klarna library is loaded
            const klarnaContainer = document.getElementById('klarna-checkout-container');
            
            // Assume you have a function to fetch Klarna session details from your server
            fetchKlarnaSession().then(session => {
                window.Klarna.Payments.init({
                    client_token: session.client_token  // Assuming the token is in the session object
                });
                
                window.Klarna.Payments.load({
                    container: klarnaContainer,
                    payment_method_category: 'pay_now'  // Replace with your preferred payment method
                }, response => {
                    if (response.show_form) {
                        console.log('Klarna form loaded');
                    } else {
                        console.error('Failed to load Klarna form:', response);
                    }
                });
            });
        };
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    return (
        <div id="klarna-checkout-container"></div>
    );
};

export default KlarnaCheckout;
