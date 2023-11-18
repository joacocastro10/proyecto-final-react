import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_8TyARyc-TCFBgCVYcRSYzOTAREsw4DE",
  authDomain: "proyecto-final-coder-9a088.firebaseapp.com",
  projectId: "proyecto-final-coder-9a088",
  storageBucket: "proyecto-final-coder-9a088.appspot.com",
  messagingSenderId: "1063749047679",
  appId: "1:1063749047679:web:1abb2d083bd634906c364a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
)
