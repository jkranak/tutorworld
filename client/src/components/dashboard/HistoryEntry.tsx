import {FC, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getBasicUserInfo } from '../../services/apiUser';
import {starRatingWhole} from '../../services/starRating';
import { HistoryI } from '../../interfaces/Session';
import {UserRole, emptyUserNameImage} from '../../interfaces/User';
import noPhotoUser from '../../assets/no_photo_user.png';
import {BsStarFill, BsStar} from 'react-icons/bs'
import moment from 'moment';

interface Props {
  session: HistoryI
  user: UserRole
}

export const HistoryEntry: FC<Props> = ({session, user}: Props) => {
  const [otherUserInfo, setOtherUserInfo] = useState(emptyUserNameImage);
  const starArr: number[] = starRatingWhole(session.starRating);

  useEffect(() => {
    if (session.StudentId && session.TutorId) {
      const otherId = user.role === 'tutor' ? session.StudentId : session.TutorId;
      const otherRole = user.role === 'tutor' ? 'student' : 'tutor';
      getBasicUserInfo(otherId, otherRole).then(res => {
        setOtherUserInfo(res);
      })
    }
  }, [])

  return (
    <div className="dashboard__content--display--session">
      <div className="image-box">
        <img src={otherUserInfo.imageUrl ? otherUserInfo.imageUrl : noPhotoUser} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} />
      </div>
      <div className="dashboard__content--display--session-details">
        <div 
        className="dashboard__content--display--session--left-box">
          <h2>{otherUserInfo.firstName} {otherUserInfo.lastName}</h2>
          <span>{moment(session.date).format('YYYY MMM DD')}</span>
          <span>{session.time}</span>
        </div>
        <div className="dashboard__content--display--session--right-box">
          <div>
            <h2>Price: ${session.cost}</h2>
            <span>{session.review}</span>
          </div>
          <div>
            {session.starRating > 0 ? <span>{starArr?.map(el => (
                el === 2 ? <BsStarFill key={uuidv4()} className="tutor-profile__info--star"/> : <BsStar key={uuidv4()} className="tutor-profile__info--star"/>
              ))}</span> : user.role === 'tutor' ? <span>No ratings yet</span> : <Link to={{
                pathname:'/review', 
                state:{
                  date: session.date,
                  time: session.time,
                  name: `${otherUserInfo.firstName} ${otherUserInfo.lastName}`,
                  rating: session.starRating ? session.starRating : 0,
                  review: session.review ? session.review : ''
                }
              }}>Review this session</Link>}
          </div>
        </div>
      </div>
    </div>
  )
}
