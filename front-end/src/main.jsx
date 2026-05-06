import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_c-j5r6dZ9DpHzN45YsAemcO4GjF8IMg",
  authDomain: "full-stack-react-learning.firebaseapp.com",
  projectId: "full-stack-react-learning",
  storageBucket: "full-stack-react-learning.firebasestorage.app",
  messagingSenderId: "691554438306",
  appId: "1:691554438306:web:e2ce6af65d56b5847a1bfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
