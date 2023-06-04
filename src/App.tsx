import React from 'react';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAnalytics } from "firebase/analytics";
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt_EqN0Oq85nzt7zfmdXbOG6cye9xgNrA",
  authDomain: "social-media-clone-de887.firebaseapp.com",
  projectId: "social-media-clone-de887",
  storageBucket: "social-media-clone-de887.appspot.com",
  messagingSenderId: "338715349602",
  appId: "1:338715349602:web:97fca966273665b211373b",
  measurementId: "G-RZ12LZWF93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


function App() {
    return (
        <div>
            <h1>hello world</h1>
        </div>
    );
}

export default App;
