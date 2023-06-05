import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LogIn from './components/LogIn';
import MainMenu from './components/MainMenu';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBt_EqN0Oq85nzt7zfmdXbOG6cye9xgNrA",
    authDomain: "social-media-clone-de887.firebaseapp.com",
    databaseURL: "https://social-media-clone-de887-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "social-media-clone-de887",
    storageBucket: "social-media-clone-de887.appspot.com",
    messagingSenderId: "338715349602",
    appId: "1:338715349602:web:97fca966273665b211373b",
    measurementId: "G-RZ12LZWF93"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();


function App() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    auth.onAuthStateChanged(user => user ? setIsLoggedIn(true) : setIsLoggedIn(false))

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            {isLoggedIn ? <MainMenu /> : <LogIn setIsLoggedIn={setIsLoggedIn} />}
        </div>
    );
}

export default App;
