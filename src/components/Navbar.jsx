// import { buildTimeValue } from "@testing-library/user-event/dist/utils"
import React from "react"
import { signOut } from "firebase/auth"
import { auth } from "../App"
import { Link } from "react-router-dom"

export default function Navbar(props) {


    const logout = async () => {
        // props.setIsLoggedIn(false);
        window.location = window.location.origin;
        await signOut(auth);
    }

    // console.log("auth:", auth.currentUser);

    return (
        <div className="nav-container">
            <nav>
                <h1 className="nav-header">
                    nagyb.xyz
                </h1>
                <ul>
                    {props.isLoggedIn && 
                        <li>
                            <Link className="router-link" to="/">Home</Link>
                        </li>}
                    {props.isLoggedIn && 
                        <li>
                            <Link className="router-link" to="myprofile">My Profile</Link>
                        </li>}
                    {props.isLoggedIn && <li className="log-out-button" onClick={logout}>Log Out</li>}
                </ul>
            </nav>
        </div>
    )
}