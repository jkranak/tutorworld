import { MessagesContainer } from "../components/MessagesContainer"
import { Navbar } from "../components/Navbar"
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { getMessages, getRooms } from "../services/apiChat";
import { RoomI } from "../interfaces/Room";

let socket: any;
const CONNECTION_PORT = process.env.REACT_APP_API_URL || '';

export const Messages = () => {
  //TO-DO fix typescript anys
  const [ rooms, setRooms ] = useState<RoomI[]>([]);
  const [ messagesList, setMessagesList ] = useState<any>([]);
  const [ currentRoom, setCurrentRoom] = useState<RoomI>();

  useEffect(() => {
    // retrieve all rooms from current user
    getRooms().then(res =>  setRooms(res));
    socket = io(CONNECTION_PORT, { transports : ['websocket'] })
    // retrieve all messages from that room
  }, []);

  useEffect(() => {
    socket.on('receive_message', (incomingMessage: any) => {
      setMessagesList((current: any) => ([...current, incomingMessage]))
    })
  }, [])

  useEffect(() => {
    if (currentRoom) {
      socket.emit('join_room', currentRoom.room);
      getMessages(currentRoom.room).then(res => {
        setMessagesList(res)
      })
    }
  }, [currentRoom])

  const sendMessage = (message: any) => {
    socket.emit('send_message', message);
    setMessagesList((current: any )=> ([...current, message]))
  }
  
  return (
    <div className="messages">
      <Navbar />
      <MessagesContainer messagesList={messagesList} sendMessage={sendMessage} rooms={rooms} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>
    </div>
  )
}
