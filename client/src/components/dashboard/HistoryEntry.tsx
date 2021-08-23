import {FC, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {starRatingWhole} from '../../services/starRating';
import { HistoryComplex } from '../../interfaces/Session';
import {UserRole, emptyUserNameImage} from '../../interfaces/User';
import noPhotoUser from '../../assets/no_photo_user.png';
import {BsStarFill, BsStar} from 'react-icons/bs'
import moment from 'moment';

interface Props {
  session: HistoryComplex
  user: UserRole
}

export const HistoryEntry: FC<Props> = ({session, user}: Props) => {
  const [otherUserInfo, setOtherUserInfo] = useState(emptyUserNameImage);
  const starArr: number[] = starRatingWhole(session.starRating);
  const reviewState = {
      date: session.date,
      time: session.time,
      name: `${otherUserInfo.firstName} ${otherUserInfo.lastName}`,
      rating: session.starRating ? session.starRating : 0,
      review: session.review ? session.review : ''
    }

    useEffect(() => {
      const firstName = user.role === 'tutor' ? session.Student.firstName : session.Tutor.firstName;
      const lastName = user.role === 'tutor' ? session.Student.lastName : session.Tutor.lastName;
      const imageUrl = user.role === 'tutor' ? session.Student.imageUrl : session.Tutor.TutorInfo.imageUrl;
      setOtherUserInfo({firstName, lastName, imageUrl})
    }, [session.Student.firstName, session.Student.imageUrl, session.Student.lastName, session.Tutor.TutorInfo.imageUrl, session.Tutor.firstName, session.Tutor.lastName, user.role])

    const sessionDetailState = {
      type: 'history',
      name: `${otherUserInfo.firstName} ${otherUserInfo.lastName}`,
      image: otherUserInfo.imageUrl,
      date: session.date,
      time: session.time,
      cost: session.cost,
      context: session.sessionContext,
      rating: session.starRating ? session.starRating : 0,
      review: session.review ? session.review : ''
    }

  return (
    <div className="dashboard__content--display--session">
      <div className="image-box">
        <Link to={{
          pathname:'/session', 
          state: sessionDetailState
        }}>
          {otherUserInfo.imageUrl 
            ? <img src={otherUserInfo.imageUrl} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} height="40px" />
            : <img src={noPhotoUser} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} height="40px" />}
        </Link>
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
                state: reviewState
              }}>Review this session</Link>}
          </div>
        </div>
      </div>
    </div>
  )
}
