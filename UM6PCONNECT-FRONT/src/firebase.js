// firebase.js or firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBtpDXSZW8NFuX9F3LZKCRA4A1MgRbUNGw',
  authDomain: 'um6p-connect.firebaseapp.com',
  projectId: 'um6p-connect',
  storageBucket: 'um6p-connect.appspot.com',
  messagingSenderId: '294851940602',
  appId: '1:294851940602:web:someAppId', // Replace with your actual app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Export auth for use in other files
export { auth };
