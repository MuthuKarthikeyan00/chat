import {React,useEffect,useState} from 'react';
import {Avatar} from '@material-ui/core';
import './SlidebarChat.css';
import db from "./firebase";
import {Link} from 'react-router-dom';
import ph from "./img/standGroup1.jpg";


const SlidebarChat = ({addNewChat,name,id}) => {

    const [sfeed, setSfeed] = useState("");
    const [message, setMessages] = useState('');
    console.log(message);
    console.log("id");
    let idid='IxNnkslzDCpFuSpNqgOq';
    useEffect(() => {
      if(id){
        db.collection("rooms").doc(id).collection('messages').orderBy('timestamp',"asc").onSnapshot((Snapshot) => setMessages(Snapshot.docs.map((doc) => doc.data() ))
        );
      }
   
    }, [id])

    useEffect(()=>{
        setSfeed(Math.floor(Math.random() *5000))
    },[])

    const creatChat=()=>{
        const roomName =prompt("please Enter your group name")

        if(roomName){
           db.collection("rooms").add({
               name:roomName,
           });
        }
    };

    return  !addNewChat ?(
       <Link to={`/room/${id}`}>
        <div className='SlidebarChat'>

            {id==idid ?(   <Avatar src={ph}/>)
            :(   <Avatar src={`https://avatars.dicebear.com/api/human/${sfeed}.svg`}/>)}
         
           <div className='SlidebarChat__info'>
           <h2>{name}</h2>
           <p> {message[message.length-1]?.message}</p>
           </div>
           </div> 
        </Link>
       ):(
            <div className="SlidebarChat" onClick={creatChat}>
                <h2>Add new chat</h2>
            </div>
        );
    
}

export default SlidebarChat;
