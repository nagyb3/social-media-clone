import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LogIn from './components/LogIn';
import MainMenu from './components/MainMenu';
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./components/MyProfile"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import MyProfile from './components/MyProfile';

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
    
    // const router = createBrowserRouter([
    //     {
    //         path: "/",
    //         element = {} <MainMenu />
    //     },
    // ]);

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            {/* <RouterProvider router={router} /> */}
            <Router>
                <Routes>
                    <Route exact path="/" element={isLoggedIn ? <MainMenu /> : <LogIn />} />
                    <Route exact path="/myprofile" element={<MyProfile />} />
                </Routes>
            </Router>
        </div>    
    );
}

export default App;
