import { buildTimeValue } from "@testing-library/user-event/dist/utils"
import React from "react"

export default function Navbar(props) {



    return (
        <div className="nav-container">
            <nav>
                <h1 className="nav-header">
                    My social media site clone
                </h1>
                <ul>
                    {props.isLoggedIn && <li>Home</li>}
                    {props.isLoggedIn && <li>My Profile</li>}
                    {props.isLoggedIn && <li>Log Out</li>}
                </ul>
            </nav>
        </div>
    )
}