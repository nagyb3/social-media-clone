import React from "react"
import { db } from "../App"
import { collection, getDocs } from "firebase/firestore"
// import { auth } from "../App"
import MessageCard from "./MessageCard"
import { getAuth } from "firebase/auth"
import { app } from "../App"


export default function MyProfile() {
  const auth = getAuth(app);

    const [messageList, setMessageList] = React.useState([]);

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

    function compare(a, b) {
        if ( a.createdAt.seconds < b.createdAt.seconds){
          return 1;
        }
        if ( a.createdAt.seconds > b.createdAt.seconds ){
          return -1;
        }
        return 0;
    }
  
    React.useEffect(() => {
        getMessageList();
    }, [])


    return (
        <div className="my-profile-container">
            <h1>Your Messages</h1>
            <h2>Your are logged in as:</h2>
            <p>{auth.currentUser.email}</p>
            <p>{auth.currentUser.displayName}</p>
            <div className="my-messages-container">
                {messageList.map(mes => {
                    if (mes.authorEmail === auth.currentUser.email) {
                        return (
                            <MessageCard showDeleteButton={true} getMessageList={getMessageList} key={mes.id} m={mes}/>
                        )
                    }
                })}
            </div>
        </div>
    )
}