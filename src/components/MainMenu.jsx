import React, { useEffect, useState } from "react";

import { db } from "../App.jsx"
import {docs, collection, getDocs} from "firebase/firestore"
import dateFormat, { masks } from "dateformat";

export default function MainMenu() {

    const [messageList, setMessageList] = useState([]);
    const [newMessage, setNewMessage] = useState("")
  
    console.log(db)

    const messagesCollectionRef = collection(db, "messages");
  
    const getMessageList = async () => {
      try {
        const data = await getDocs(messagesCollectionRef)
        // console.log(data)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id
        }));
        console.log(filteredData)
        setMessageList(filteredData)
      } catch (err) {
        console.error(err)
      }
    }  

    useEffect(() => {
        getMessageList();
    }, [])


    return (
        <div>
            <h1>hey you are logged in!</h1>
            {messageList.map((m) => (
                <div>
                    <p>{m.message}</p>
                    <p>Date: {dateFormat(m.createdAt.toDate(), "yyyy mmmm dS, HH:MM:ss")}</p>
                    {/* <button onClick={() => deleteDocument(m.id)}>delete this</button> */}
                </div>
            ))}
        </div>
    )
}