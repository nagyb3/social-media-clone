import React from "react";
import dateFormat, { masks } from "dateformat";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { doc } from "firebase/auth"

export default function MessageCard(props) {
    
    const [currentUserLikedThisMessage, setCurrentUserLikedThisMessage] = React.useState(false)

    /*
    others on card:
    -   like button
    -   write comment textarea + post button
    -   show last comments
    */

    // const clickLikeButton = async () => {
    //     setCurrentUserLikedThisMessage(!currentUserLikedThisMessage);
    //     const docRef = 
    // }

    return (
        <div className="message-card-container">
            <div className="top-row">
                <p className="display-name">@{props.m.authorDisplayName}</p>
                <p>{dateFormat(props.m.createdAt.toDate(), "yyyy mmmm dS, HH:MM:ss")}</p>
            </div>
            <p className="message">{props.m.message}</p>
            
            <div className="bottom-row">
                <div onClick={clickLikeButton}>
                    {currentUserLikedThisMessage ? 
                    <FavoriteIcon />:
                    <FavoriteBorderIcon/>}
                </div>
                <p className="number-of-likes">{props.m.numberOfLikes}</p>
            </div>
            
        </div>
    )
}