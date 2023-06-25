import React, { useEffect, useState } from "react";

import { db } from "../App.jsx"
import { collection, getDocs, addDoc } from "firebase/firestore"
import MessageCard from "./MessageCard.jsx";
import { auth } from "../App.jsx"

export default function MainMenu() {

    const [messageList, setMessageList] = useState([]);
    const [newMessage, setNewMessage] = useState("")

    const messagesCollectionRef = collection(db, "messages");
  
    const getMessageList = async () => {
      try {
        const data = await getDocs(messagesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id
        }));
        filteredData.sort(compare);
        setMessageList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    //comparision used for sorting for newest
    function compare(a, b) {
      if ( a.createdAt.seconds < b.createdAt.seconds){
        return 1;
      }
      if ( a.createdAt.seconds > b.createdAt.seconds ){
        return -1;
      }
      return 0;
    }

    useEffect(() => {
      getMessageList();
    }, [])

    const onSubmitMessage = async (e) => {
      e.preventDefault();
      if (newMessage !== "") {
        try {
          await addDoc(messagesCollectionRef, {
            message: newMessage,
            createdAt: new Date(),
            authorDisplayName: auth.currentUser.displayName, 
            authorEmail: auth.currentUser.email,
            numberOfLikes: 0,
            usersWhoLikedThis: []
          });
          getMessageList();
          setNewMessage("");
        } catch (err) {
          console.error(err);
        }
      }
    }

    return (
        <div className="main-menu-container">
            {/* <h1>hey you are logged in!</h1> */}
            <form onSubmit={onSubmitMessage} className="new-post-form">
              <input value={newMessage} onChange={e => setNewMessage(e.target.value)} className="text-input" type="text" placeholder="whats on your mind?"/>
              <input type="submit" className="post-button" value="SEND"/>
            </form>
            <div className="all-message-container">
                {messageList.map((m) => (
                    <MessageCard showDeleteButton={false} getMessageList={getMessageList} key={m.id} m={m}/>
                ))}
            </div>
            
        </div>
    )
}