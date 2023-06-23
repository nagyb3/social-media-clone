import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LogIn from './components/LogIn';
import MainMenu from './components/MainMenu';
import "./components/MyProfile"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    HashRouter,
} from "react-router-dom";
import { createContext } from 'react';

import { initializeApp } from "firebase/app";
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

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const ThemeContext = createContext(null);

function App() {
    
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
    auth.onAuthStateChanged(user => user ? setIsLoggedIn(true) : setIsLoggedIn(false))
    
    React.useEffect(() => {
        document.title = 'nagyb.xyz';
    }, []);
    
    const [theme, setTheme] = React.useState('light');

    function toggleTheme() {
        setTheme(theme => (theme === 'light') ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div id={theme}>
                <Router>
                    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    <Routes>
                        <Route path="/" element={isLoggedIn ? <MainMenu /> : <LogIn />} />
                        <Route path="myprofile" element={<MyProfile />} />
                    </Routes>
                </Router>
            </div>    
        </ThemeContext.Provider>
    );
}

export default App;
