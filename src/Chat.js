import React from 'react';
import { useEffect, useState } from 'react';
import "./Chat.css";
import { Avatar, colors, IconButton } from '@material-ui/core';
import MicIcon from '@material-ui/icons/MicNone';
import InsertEmotIcon from '@material-ui/icons/InsertEmoticon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import ph from "./img/standGroup1.jpg";

const Chat = () => {


    const [Input, setInput] = useState("")
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user},dispatch]=useStateValue();
    

    const arrColor=["#eb660d","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8"];
 
     
    console.log(messages);

    useEffect(() => {
        if (roomId) {
             

            db.collection("rooms").doc(roomId).onSnapshot(Snapshot => (
                setRoomName(Snapshot.data().name)
            ))
            db.collection("rooms").doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((Snapshot) => setMessages(Snapshot.docs.map((doc) => doc.data() ))
            );
        }
    }, [roomId])





    const valueChange = (e) => {
        setInput(e.target.value);
    }


    const sendMessage = (e) => {
        e.preventDefault();

        console.log("your input is >>" + Input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message:Input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }



    return (
        <div className="Chat">

            <div className="Chat__header">
           
            {roomId=="IxNnkslzDCpFuSpNqgOq" ?(<Avatar src={ph}/>)
            :(<Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />)}

                <div className="Chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                        {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>

                <div className="Chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="Chat__body">

                {messages.map((item,index) => (

                    <p className={`Chat__message ${item.name==user.displayName && 'Chat__reciver'}`}>
                        <span style={{color:arrColor[index]}} className="Chat__name">{item.name}</span>
                     
                        {item.message}
                        <span className="Chat__timestamp">{new Date(item.timestamp?.toDate()).toUTCString()}</span>
                    </p>

                ))}





            </div>

            <div className="Chat__footer">
                <InsertEmotIcon />
                <form>
                    <input value={Input} onChange={valueChange} type="text" placeholder="Type a message"></input>
                    <button disabled={!Input} onClick={sendMessage} type="submit">send message</button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat;
