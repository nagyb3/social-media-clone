import React, { useEffect, useState } from "react";

import { db } from "../App.jsx"
import { docs, collection, getDocs, addDoc } from "firebase/firestore"
import MessageCard from "./MessageCard.jsx";
import { auth, messagesCollectionRef } from "../App.jsx"

export default function MainMenu() {

    const [messageList, setMessageList] = useState([]);
    const [newMessage, setNewMessage] = useState("")
  
    // console.log(db)

    const messagesCollectionRef = collection(db, "messages");
  
    const getMessageList = async () => {
      try {
        const data = await getDocs(messagesCollectionRef)
        // console.log(data)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id
        }));
        // console.log(filteredData)
        setMessageList(filteredData)
      } catch (err) {
        console.error(err)
      }
    }  

    useEffect(() => {
        getMessageList();
    }, [])

    // console.log(auth)

    // console.log("sent displayname:", auth.currentUser.displayName, "sent dispaly email:", auth.currentUser.email)

    const onSubmitMessage = async (e) => {
      e.preventDefault()
      try {
        await addDoc(messagesCollectionRef, {
          message: newMessage,
          createdAt: new Date(),
          authorDisplayName: auth.currentUser.displayName, 
          authorEmail: auth.currentUser.email
        })
        // await addDoc(messagesCollectionRef, {message: "hey"});
        getMessageList();
        console.log('1')
      } catch (err) {
        console.error(err)
      }
    }

    return (
        <div className="main-menu-container">
            <h1>hey you are logged in!</h1>
            <form onSubmit={onSubmitMessage} className="new-post-form">
              <input onChange={e => setNewMessage(e.target.value)} className="text-input" type="text" placeholder="whats on your mind?"/>
              <input type="submit" className="post-button"></input>
            </form>
            <div className="all-message-container">
                {messageList.map((m) => (
                    <MessageCard key={m.id} m={m}/>
                ))}
            </div>
        </div>
    )
}