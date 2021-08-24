import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import noPhotoUser from '../assets/no_photo_user.png';
import { RoomI } from '../interfaces/Room';
import { emptyUserNameImage } from '../interfaces/User';
import { getStudentDetails, getTutorDetails } from '../services/apiUser';
import { v4 as uuidv4 } from 'uuid';
import { MessagesList } from "./MessagesList";
import { currentRoom } from "../redux/actions/currentRoom";
import { FiPhone, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RootState } from '../redux/store/store';
import { MessageCompleteI } from '../interfaces/Message';

interface Props {
  messagesList: MessageCompleteI[]
  sendMessage: Function
  rooms: RoomI[],
}

export const MessagesContainer = ({ messagesList, sendMessage, rooms }: Props) => {
  const user = useSelector((state: RootState) => state.authenticate);
  const room = useSelector((state: RootState) => state.currentRoom);
  const [userDetails, setUserDetails] = useState(emptyUserNameImage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.role === 'student') {
      getStudentDetails().then(res => {
        setUserDetails({
          firstName: res.firstName,
          lastName: res.lastName,
          imageUrl: res.imageUrl ? res.imageUrl : null
        });
      })
    } else if (user.role === 'tutor') {
      getTutorDetails(user.id).then(res => {
        setUserDetails({
          firstName: res.firstName,
          lastName: res.lastName,
          imageUrl: res.imageUrl
        });;
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
            <Link to={'/call'} className="btn btn--blue"><FiPhone /></Link>
          </div>
          {/* <div>search</div> TO-DO filter contacts*/}
          {rooms && rooms.map(currRoom => 
            <div className={`messages__content--contact ${room && room.room === currRoom.room && 'selected'}`} key={uuidv4()} onClick={() => changeCurrentRoom(currRoom)} >
              <div className="image-box">
                {/* since there is no group chat feature we can just select index 0 */}
                <img src={currRoom.senders[0].imageUrl ? currRoom.senders[0].imageUrl : noPhotoUser} alt={`${currRoom.senders[0].firstName} ${currRoom.senders[0].lastName}`} />
              </div>
              <span>{`${currRoom.senders[0].firstName} ${currRoom.senders[0].lastName}`}</span>
          </div>)
          } 
        </div>
        {room ? <MessagesList messagesList={messagesList} sendMessage={sendMessage}/> : <div className="messages__content--right-box">
          <div className="messages__content--right-box--find-tutor">
            <FiSearch className="search-icon"/>
            <Link to={'/search'} className="btn btn--blue">Message a tutor</Link>
          </div>
        </div> }
      </section>
    </main>
  )
}
