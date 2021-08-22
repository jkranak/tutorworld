import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFavTutors } from '../../services/apiUser';
import { currentTutorInfo } from '../../redux/actions/currentTutorInfo';
import { TutorWithAvailability, emptyTutorWithAvailability } from '../../interfaces/Tutor';
import { enterRoom, getSenderId } from '../../services/apiChat';
import { currentRoom } from '../../redux/actions/currentRoom';

export const FavTutors: FC = () => {
  const [favTutors, setFavTutors] = useState([emptyTutorWithAvailability]);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.authenticate)

  const handleSchedule = (index: number) => {
    dispatch(currentTutorInfo(favTutors[index]));
    history.push('/schedule');
  }

  const handleProfile = (index: number) => {
    dispatch(currentTutorInfo(favTutors[index]));
    history.push('/viewprofile');
  }

  const handleMessage = async (tutor: any) => {
    // check if there is already a room with this tutor, if not create a new room
    console.log(tutor);
    const { SenderId } = await getSenderId(tutor.TutorId, 'tutor');
    console.log('user', user)
    const room = await enterRoom({mySenderId: user.SenderId, otherUserSenderId: SenderId})
    console.log('room response', room)
    // // my sender id, tutor sender id,
    // dispatch(currentRoom(room));
    // history.push({
    //   pathname: '/messages',
    //   state: room
    // });
  }

  useEffect(() => {
    getFavTutors().then(res => {
      setFavTutors(res);
    })
  }, [])

  return (
    <div className="dashboard__content--display--info">
      <h1 className="dashboard__content--display--title">Favorite Tutors</h1>
      {favTutors.map((tutor: TutorWithAvailability, index: number) => (
        <div key={tutor.TutorId} className="dashboard__content--display--session">
          <div className="image-box">
            <img src={tutor.imageUrl} alt={`${tutor.firstName} ${tutor.lastName}`}/>
          </div>
          <div className="dashboard__content--display--session-details">
            <div className="dashboard__content--display--session--left-box">
              <h2>{tutor.firstName} {tutor.lastName}</h2>
              <button onClick={() => handleSchedule(index)}>Schedule</button>
              <button onClick={() => handleProfile(index)}>Profile</button>
              <button onClick={() => handleMessage(tutor)}>Message</button>
            </div>  
          </div>
        </div>
      ))}
    </div>
  )
}
