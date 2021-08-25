import {FC} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {TutorWithAvailability} from '../interfaces/Tutor';
import {starRating} from '../services/starRating';
import { enterRoom, getSenderId } from '../services/apiChat';
import {BsStarFill, BsStar, BsStarHalf} from 'react-icons/bs'
import { currentTutorInfo } from '../redux/actions/currentTutorInfo';
import { currentRoom } from '../redux/actions/currentRoom';
import { RootState } from '../redux/store/store';

interface Props {
  tutor: TutorWithAvailability
}

export const SearchResult: FC<Props> = ({tutor}: Props) => {
  const starArr: number[] = starRating(tutor?.rating);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: RootState) => state.authenticate)

  const handleSchedule = () => {
    dispatch(currentTutorInfo(tutor));
    history.push('/schedule');
  }

  const handleMessage = async () => {
    // check if there is already a room with this tutor, if not create a new room
    const { SenderId } = await getSenderId(tutor.TutorId, 'tutor');
    const room = await enterRoom({mySenderId: user.SenderId, otherUserSenderId: SenderId})
    // my sender id, tutor sender id,
    dispatch(currentRoom(room));
    history.push({
      pathname: '/messages',
      state: room
    });
  }

  const handleProfile = () => {
    dispatch(currentTutorInfo(tutor));
    history.push('/viewprofile');
  }

  return (
    <div className="tutor-card">
      <div className="tutor-card__left-box">
        <h1 className="tutor-card__name">{tutor?.firstName} {tutor?.lastName}</h1>
        <div className="image-box">
          <img src={tutor?.imageUrl} alt={`${tutor?.firstName} ${tutor?.lastName}`} />
        </div>
      </div>
      <div className="tutor-card__middle-box">
        <div>
          <div className="tutor-card__middle-box--details">
            <h2>Education: </h2>
            <span>{tutor?.education}</span>
          </div>
          <div className="tutor-card__middle-box--rating">
            {tutor.rating && starArr.map((el, index) => (
              <span key={index} className="tutor-card__middle-box--star">{el === 2 ? <BsStarFill/> : el === 1 ? <BsStarHalf/> : <BsStar/>}</span>
            ))}
          </div>
          <div className="tutor-card__middle-box--details">
              <h3>Rate: </h3>
              <span>${tutor?.price}/hour</span>
          </div>
        </div>
      </div>
      <div className="tutor-card__right-box">
        <div className="tutor-card__right-box--description">
          <p>{tutor?.description}</p>
        </div>
        <div className="tutor-card__right-box--buttons">
          <button className="btn btn--blue" onClick={handleSchedule}>Schedule</button>
          <button className="btn btn--blue" onClick={handleMessage}>Message</button>
          <button className="btn btn--blue" onClick={handleProfile}>Profile</button>
        </div>
      </div>
    </div>
  )
}
