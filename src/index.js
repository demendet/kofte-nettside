import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDN2jrDbV_AHC7tI_wywu0KmU1LY7GnQ8s",
  authDomain: "kofte-nettside-88641.firebaseapp.com",
  projectId: "kofte-nettside-88641",
  storageBucket: "kofte-nettside-88641.appspot.com",
  messagingSenderId: "311270449996",
  appId: "1:311270449996:web:1cb6882997fc0c3f6ba5e9",
  measurementId: "G-G0EHGJDPBY"
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

initializeApp(firebaseConfig);