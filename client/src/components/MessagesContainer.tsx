import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import noPhotoUser from '../assets/no_photo_user.png';
import { RoomI } from "../interfaces/Room";
import { getStudentDetails, getTutorDetails } from "../services/apiUser";
import { v4 as uuidv4 } from 'uuid';
import { MessagesList } from "./MessagesList";
import { currentRoom } from "../redux/actions/currentRoom";
interface Props {
  messagesList: []
  sendMessage: Function
  rooms: RoomI[],
}

export const MessagesContainer = ({ messagesList, sendMessage, rooms }: Props) => {
  // TO-DO fix typescript any
  const user = useSelector((state: any) => state.authenticate);
  const room = useSelector((state: any) => state.currentRoom);
  const [userDetails, setUserDetails] = useState<any>(null);
  const dispatch = useDispatch();

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
  }, [user.id, user.role])

  const changeCurrentRoom = (room: RoomI) => {
    dispatch(currentRoom(room))
  }

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
          {/* <div>search</div> */}
          {rooms && rooms.map(currRoom => 
            <div className={`messages__content--contact ${room && room.room === currRoom.room && 'selected'}`}key={uuidv4()} onClick={() => changeCurrentRoom(currRoom)} >
              <div className="image-box">
                {/* since there is no group chat feature we can just select que index 0 */}
                <img src={currRoom.senders[0].imageUrl ? currRoom.senders[0].imageUrl : noPhotoUser} alt={`${currRoom.senders[0].firstName} ${currRoom.senders[0].lastName}`} />
              </div>
              <span className="me__name">{`${currRoom.senders[0].firstName} ${currRoom.senders[0].lastName}`}</span>
          </div>)
          }
          
        </div>
        {room ? <MessagesList messagesList={messagesList} sendMessage={sendMessage}/> : <div className="messages__content--right-box">Find a tutor</div> }
      </section>
    </main>
  )
}
