import { MessagesContainer } from "../components/MessagesContainer"
import { Navbar } from "../components/Navbar"
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { getMessages, getRooms, sendNewMessage } from "../services/apiChat";
import { RoomI } from "../interfaces/Room";
import { MessageCompleteI } from "../interfaces/Message";
import { useSelector } from "react-redux";

let socket: any;
const CONNECTION_PORT = process.env.REACT_APP_API_URL || '';

export const Messages = () => {
  //TO-DO fix typescript anys
  const [ rooms, setRooms ] = useState<RoomI[]>([]);
  const [ messagesList, setMessagesList ] = useState<any>([]);
  const currentRoom = useSelector((state: any) => state.currentRoom);

  useEffect(() => {
    getRooms().then(res =>  setRooms(res));
    socket = io(CONNECTION_PORT, { transports : ['websocket'] })
  }, []);
  
  useEffect(() => {
    if (currentRoom) {
      socket.emit('join_room', currentRoom.room);
      getMessages(currentRoom.room).then(res => {
        setMessagesList(res)
      })
    }
  }, [currentRoom])
  
  useEffect(() => {      
    socket.on('receive_message', (incomingMessage: MessageCompleteI) => {
      if (currentRoom && incomingMessage.RoomId === currentRoom.room) {
        setMessagesList((current: any) => ([...current, incomingMessage]))
      }
    })
  }, [currentRoom])

  const sendMessage = async (message: string, SenderId: string) => {
    if (currentRoom) {
      const newMessage = await sendNewMessage({content: message, SenderId, RoomId: currentRoom.room})
      console.log('new message', newMessage);
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
