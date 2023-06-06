import React from "react";
import dateFormat, { masks } from "dateformat";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { doc, updateDoc } from "firebase/firestore"
import { db, auth } from "../App"

export default function MessageCard(props) {
    
    const [currentUserLikedThisMessage, setCurrentUserLikedThisMessage] = React.useState(
        props.m.usersWhoLikedThis.includes(auth.currentUser.email)
    )

    const clickLikeButton = async () => {
        if (!currentUserLikedThisMessage) {  // most likeolta be
            let newUsersWhoLikedThis = [...props.m.usersWhoLikedThis];
            newUsersWhoLikedThis.push(auth.currentUser.email)
            
            await updateDoc(doc(db, "messages", props.m.id), {
                numberOfLikes: props.m.numberOfLikes + 1, 
                usersWhoLikedThis: newUsersWhoLikedThis
            })
        } else {
            let newUsersWhoLikedThis = props.m.usersWhoLikedThis;
            newUsersWhoLikedThis = newUsersWhoLikedThis.filter(function(e) { return e !== auth.currentUser.email})
            
            await updateDoc(doc(db, "messages", props.m.id), {
                numberOfLikes: props.m.numberOfLikes - 1,
                usersWhoLikedThis: newUsersWhoLikedThis
            })
        }
        setCurrentUserLikedThisMessage(!currentUserLikedThisMessage);
        props.getMessageList();
    }

    return (
        <div className="message-card-container">
            <div className="top-row">
                <p className="display-name">@{props.m.authorDisplayName}</p>
                <p>{dateFormat(props.m.createdAt.toDate(), "yyyy mmmm dS, HH:MM:ss")}</p>
            </div>
            <p className="message">{props.m.message}</p>
            
            <div className="bottom-row" onClick={clickLikeButton}>
                <div>
                    {currentUserLikedThisMessage ? 
                    <FavoriteIcon />:
                    <FavoriteBorderIcon/>}
                </div>
                <p className="number-of-likes">{props.m.numberOfLikes}</p>
            </div>
        </div>
    )
}