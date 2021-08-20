import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import noPhotoUser from '../assets/no_photo_user.png';
import { RoomI } from "../interfaces/Room";
import { getStudentDetails, getTutorDetails } from "../services/apiUser";
import { v4 as uuidv4 } from 'uuid';
import { MessagesList } from "./MessagesList";
interface Props {
  messagesList: []
  sendMessage: Function
  rooms: RoomI[],
  currentRoom: RoomI | undefined,
  setCurrentRoom: Function
}

export const MessagesContainer = ({ messagesList, sendMessage, rooms, currentRoom, setCurrentRoom }: Props) => {
  // TO-DO fix typescript any
  const user = useSelector((state: any) => state.authenticate);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    if (user.role === 'student') {
      getStudentDetails().then(res => {
        setUserDetails(res);
      })
    } else if (user.role === 'tutor') {
      getTutorDetails(user.id).then(res => {
        setUserDetails(res);
      })
    }
  }, [])

  return (
    <main className="messages__content">
      <section className="messages__content--box">
        <div className="messages__content--left-box">
          <div className="messages__content--contact me">
            <div className="image-box">
              <img src={userDetails?.imageUrl ? userDetails?.imageUrl : noPhotoUser} alt={`${userDetails?.firstName} ${userDetails?.lastName}`} />
            </div>
            <span className="me__name">{`${userDetails?.firstName} ${userDetails?.lastName}`}</span>
          </div>
          <div>search</div>
          {/* map all rooms */}
          {rooms && rooms.map(room => 
            <div className="messages__content--contact" key={uuidv4()} onClick={() => setCurrentRoom(room)}>
              <div className="image-box">
                {/* since there is no group chat feature we can just select que index 0 */}
                <img src={room.senders[0].imageUrl ? room.senders[0].imageUrl : noPhotoUser} alt={`${room.senders[0].firstName} ${room.senders[0].lastName}`} />
              </div>
              <span className="me__name">{`${room.senders[0].firstName} ${room.senders[0].lastName}`}</span>
          </div>)
          }
          
        </div>
        {currentRoom ? <MessagesList messagesList={messagesList} sendMessage={sendMessage}/> : <div className="messages__content--right-box">Enter a chat</div> }
      </section>
    </main>
  )
}
