import React from 'react';
import './Slidebar.css';
import {Avatar,IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SlidebarChat from './SlidebarChat';
import {useEffect,useState} from 'react';
import db from "./firebase";
import {useStateValue} from './StateProvider';

const Slidebar = () => {

  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();
 
console.log(user);

  useEffect(() => {
      const unsubscribe= db.collection('rooms').onSnapshot((snapshot)=>
        setRooms(
            snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data(),
            }))
        )
       );
       return ()=>{
        unsubscribe();
       }
  }, []);

  console.log(rooms);
    return (
        <div className="slidebar">

            <div className="slidebar__header">
                  <Avatar  src={user.photoURL} className="avather"></Avatar>
                  <h2>{user.displayName}</h2>
                <div className="slidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                              
                </div>
            </div>

            <div className="slidebar__search">
                 <div className="slidebar__searchContainer">
                 <SearchOutlined/>
                 <input placeholder="Search or create new chat"></input>
                 </div>

            </div>

            <div className="slidebar__chats">
              < SlidebarChat addNewChat/>
        {rooms.map((item)=>(
             < SlidebarChat key={item.id} name={item.data.name} id={item.id}/>
    ))}
            </div>

        </div>
    )
}

export default Slidebar
