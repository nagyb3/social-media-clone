import React from "react";
import { auth } from "../App"
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../App";

export default function LogIn(props) {


    const logInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            props.setIsLoggedIn(true)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='log-in-container'>
            <button className="log-in-with-google" onClick={logInWithGoogle}>LOGIN WITH GOOGLE</button>
        </div>
    )
}