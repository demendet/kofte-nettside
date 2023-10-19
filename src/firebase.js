import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';

export const firebaseConfig = {
    apiKey: "AIzaSyDN2jrDbV_AHC7tI_wywu0KmU1LY7GnQ8s",
    authDomain: "kofte-nettside-88641.firebaseapp.com",
    projectId: "kofte-nettside-88641",
    storageBucket: "kofte-nettside-88641.appspot.com",
    messagingSenderId: "311270449996",
    appId: "1:311270449996:web:1cb6882997fc0c3f6ba5e9",
    measurementId: "G-G0EHGJDPBY"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const functions = getFunctions(app); 
  
  export { app, analytics, auth, db, functions }; 
