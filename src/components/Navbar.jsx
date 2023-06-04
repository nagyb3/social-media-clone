// import { buildTimeValue } from "@testing-library/user-event/dist/utils"
import React from "react"
import { signOut } from "firebase/auth"
import { auth } from "../App"

export default function Navbar(props) {


    const logout = async () => {
        await signOut(auth)
        props.setIsLoggedIn(false)
    }

    return (
        <div className="nav-container">
            <nav>
                <h1 className="nav-header">
                    My social media site clone
                </h1>
                <ul>
                    {props.isLoggedIn && <li>Home</li>}
                    {props.isLoggedIn && <li>My Profile</li>}
                    {props.isLoggedIn && <li className="log-out-button" onClick={logout}>Log Out</li>}
                </ul>
            </nav>
        </div>
    )
}