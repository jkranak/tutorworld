import { MessagesContainer } from "../components/MessagesContainer"
import { Navbar } from "../components/Navbar"
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { getMessages, getRooms, sendNewMessage } from "../services/apiChat";
import { RoomI } from "../interfaces/Room";
import { MessageCompleteI } from "../interfaces/Message";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { currentRoom } from "../redux/actions/currentRoom";

let socket: any;
const CONNECTION_PORT = process.env.REACT_APP_API_URL || '';

export const Messages = () => {
  //TO-DO fix typescript anys
  const [ rooms, setRooms ] = useState<RoomI[]>([]);
  const [ messagesList, setMessagesList ] = useState<any>([]);
  const location: any = useLocation();
  const currRoom = useSelector((state: any) => state.currentRoom);
  const dispatch = useDispatch();
  
  useEffect(() => {
    socket = io(CONNECTION_PORT, { transports : ['websocket'] })
    getRooms().then(res => setRooms(res)).then(() => {
    if (location.state) dispatch(currentRoom(location.state))
    });
  }, []);
  
  useEffect(() => {
    if (currRoom) {
      socket.emit('join_room', currRoom.room);
      getMessages(currRoom.room).then(res => {
        setMessagesList(res)
      })
    }    
  }, [currRoom])
  // TO-DO sometimes when receiving a message it is inserted a few times in the messagesList, the database only receives it once
  useEffect(() => {      
    socket.on('receive_message', (incomingMessage: MessageCompleteI) => {
      if (currRoom && incomingMessage.RoomId === currRoom.room) {
        setMessagesList((current: any) => ([...current, incomingMessage]))
      }
    })
  }, [currRoom])

  const sendMessage = async (message: string, SenderId: string) => {
    if (currRoom) {
      const newMessage = await sendNewMessage({content: message, SenderId, RoomId: currRoom.room})
      socket.emit('send_message', newMessage);
      setMessagesList((current: any )=> ([...current, newMessage]))
    }
  }
  
  return (
    <div className="messages">
      <Navbar />
      <MessagesContainer messagesList={messagesList} sendMessage={sendMessage} rooms={rooms}/>
    </div>
  )
}
