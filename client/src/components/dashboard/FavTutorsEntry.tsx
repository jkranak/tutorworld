import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TutorWithAvailability } from "../../interfaces/Tutor";
import { currentRoom } from "../../redux/actions/currentRoom";
import { currentTutorInfo } from "../../redux/actions/currentTutorInfo";
import { enterRoom, getSenderId } from "../../services/apiChat";
import { RootState } from '../../redux/store/store';
import { UserAuth } from "../../interfaces/User";

interface Props {
  tutor: TutorWithAvailability
}

export const FavTutorsEntry = ({ tutor }: Props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const user: UserAuth = useSelector((state: RootState) => state.authenticate)

  const handleSchedule = () => {
    dispatch(currentTutorInfo(tutor));
    history.push('/schedule');
  }

  const handleProfile = () => {
    dispatch(currentTutorInfo(tutor));
    history.push('/viewprofile');
  }

  const handleMessage = async () => {
    // check if there is already a room with this tutor, if not create a new room
    const { SenderId } = await getSenderId(tutor.TutorId, 'tutor');
    const room = await enterRoom({mySenderId: user.SenderId, otherUserSenderId: SenderId})
    dispatch(currentRoom(room));
    history.push({
      pathname: '/messages',
      state: room
    });
  }

  return (
    <div className="dashboard__content--display--session">
      <div className="image-box">
        <img src={tutor.imageUrl} alt={`${tutor.firstName} ${tutor.lastName}`}/>
      </div>
      <div className="dashboard__content--display--session-details">
        <div className="dashboard__content--display--session--left-box">
          <h2>{tutor.firstName} {tutor.lastName}</h2>
        </div>
        <div className="dashboard__content--display--session--right-box">
              <button className="btn btn--blue" onClick={() => handleSchedule()}>Schedule</button>
              <button className="btn btn--blue" onClick={() => handleProfile()}>Profile</button>
              <button className="btn btn--blue" onClick={() => handleMessage()}>Message</button>
        </div>
      </div>
    </div>
  )
}

