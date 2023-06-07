import React from "react";
import dateFormat, { masks } from "dateformat";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { doc, updateDoc, addDoc, collection, getDocs } from "firebase/firestore"
import { db, auth } from "../App"

export default function MessageCard(props) {
    /*
    - comments: 
    - postId
    - author (authorEmail and authorDisplayName)
    - commentText
    - createdAt
    
    - have a button on card -> shows comment input field -> hides it if pressed again
    
    - show maximum of 3 comments under posts
    
    */
   // TODO: useEffect for getCommentsList
   // map over CommentsList and return last 3 comment element (~not a component) 

    const [currentUserLikedThisMessage, setCurrentUserLikedThisMessage] = React.useState(
        props.m.usersWhoLikedThis.includes(auth.currentUser.email)
    );
    
    const [showCommentForm, setShowCommentForm] = React.useState(false);

    const [newComment, setNewComment] = React.useState("");

    const [commentsList, setCommentsList] = React.useState([]);

    const clickLikeButton = async () => {
        if (!currentUserLikedThisMessage) {  // most likeolta be
            let newUsersWhoLikedThis = [...props.m.usersWhoLikedThis];
            newUsersWhoLikedThis.push(auth.currentUser.email);
            
            await updateDoc(doc(db, "messages", props.m.id), {
                numberOfLikes: props.m.numberOfLikes + 1, 
                usersWhoLikedThis: newUsersWhoLikedThis
            })
        } else {
            let newUsersWhoLikedThis = props.m.usersWhoLikedThis;
            newUsersWhoLikedThis = newUsersWhoLikedThis.filter(function(e) { return e !== auth.currentUser.email});
            
            await updateDoc(doc(db, "messages", props.m.id), {
                numberOfLikes: props.m.numberOfLikes - 1,
                usersWhoLikedThis: newUsersWhoLikedThis
            })
        }
        setCurrentUserLikedThisMessage(!currentUserLikedThisMessage);
        props.getMessageList();
    }

    function onToggleCommentForm() {
        setShowCommentForm(!showCommentForm);
    }

    const commentsCollectionRef = collection(db, "comments");

    const getCommentsList = async () => {
        try {
          const data = await getDocs(commentsCollectionRef)
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id
          }));
          setCommentsList(filteredData)
        } catch (err) {
          console.error(err);
        }
      }  

    React.useEffect(() => {
        getCommentsList();
    }, [])

    const onSubmitNewComment = async (e) => {
        e.preventDefault();
        console.log(newComment);
        if (newComment !== "") {
            try {
              await addDoc(commentsCollectionRef, {
                text: newComment,
                createdAt: new Date(),
                authorDisplayName: auth.currentUser.displayName, 
                authorEmail: auth.currentUser.email,
                postId: props.m.id
              })
              getCommentsList();
              setNewComment("");
            } catch (err) {
              console.error(err);
            }
        }
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
            
            <button onClick={onToggleCommentForm}>toggle comment field</button>

            { showCommentForm &&
                <form onSubmit={onSubmitNewComment} className="comment">
                    <input onChange={e => setNewComment(e.target.value)} type="text" name="comment" id="comment" placeholder="send a comment" />
                    <input type="submit" className="send-comment" />
                </form>
            }
            {/* { commentsList.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
            ))} */}
        </div>
    )
}