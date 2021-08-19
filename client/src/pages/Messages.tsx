import { MessagesContainer } from "../components/MessagesContainer"
import { Navbar } from "../components/Navbar"
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRooms } from "../services/apiChat";

let socket: any;
const CONNECTION_PORT = process.env.REACT_APP_API_URL || '';

export const Messages = () => {
  //TO-DO fix typescript anys
  const [ rooms, setRooms ] = useState([]);
  const [ messagesList, setMessagesList ] = useState<any>([]);
  const userMe = useSelector((state: any) => state.authenticate);

  useEffect(() => {
    // retrieve all rooms that contain messages
    getRooms().then(res => console.log('rooms list', res));
    console.log('connection port', CONNECTION_PORT)
    socket = io(CONNECTION_PORT, { transports : ['websocket'] })
    // retrieve all messages from that room
  }, []);

  useEffect(() => {
    socket.on('receive_message', (incomingMessage: any) => {
      setMessagesList((current: any) => ([...current, incomingMessage]))
    })
  }, [])

  const enterRoom = () => {
    socket.emit('join_room', 'testroom');
  }

  const sendMessage = (message: any) => {
    socket.emit('send_message', message);
    setMessagesList((current: any )=> ([...current, message]))
  }
  
  return (
    <div className="messages">
      <Navbar />
      <MessagesContainer messagesList={messagesList} sendMessage={sendMessage}/>
    </div>
  )
}
