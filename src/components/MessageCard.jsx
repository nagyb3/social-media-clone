import React from "react";
import dateFormat, { masks } from "dateformat";

export default function MessageCard(props) {
    
    /*info needed inside db for each message document:
    -   message 
    -   createdAt
    -   number of likes
    -   author (authorDisplayName, authorEmail)
    -   

    others on card:
    -   like button
    -   write comment textarea + post button
    -   show last comments
    */

    return (
        <div className="message-card-container">
            <p>{props.m.message}</p>
            <p>Date: {dateFormat(props.m.createdAt.toDate(), "yyyy mmmm dS, HH:MM:ss")}</p>
            <p>Author: {props.m.authorDisplayName}</p>
            <p>Likes: {props.m.numberOfLikes}</p>
        </div>
    )
}