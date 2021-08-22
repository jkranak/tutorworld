import {FC, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getBasicUserInfo } from '../../services/apiUser';
import {starRatingWhole} from '../../services/starRating';
import { HistoryComplex } from '../../interfaces/Session';
import {UserRole, emptyUserNameImage} from '../../interfaces/User';
import noPhotoUser from '../../assets/no_photo_user.png';
import {BsStarFill, BsStar} from 'react-icons/bs'

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
    if (session.StudentId && session.TutorId) {
      const otherId = user.role === 'tutor' ? session.StudentId : session.TutorId;
      const otherRole = user.role === 'tutor' ? 'student' : 'tutor';
      getBasicUserInfo(otherId, otherRole).then(res => {
        setOtherUserInfo(res);
      })
    }
  }, [])

  return (
    <div>
      <p>{otherUserInfo.imageUrl 
          ? <img src={otherUserInfo.imageUrl} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} height="40px" />
          : <img src={noPhotoUser} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} height="40px" />}
        {otherUserInfo.firstName} {otherUserInfo.lastName} - {session.date}, {session.time} - Price: ${session.cost} - 
        {user.role === 'student' ? <Link to={{
            pathname:'/review', 
            state: reviewState
          }}> Review</Link> : <span> Review</span>}: {session.review} - 
        {session.starRating > 0 ? <span>{starArr?.map(el => (
            el === 2 ? <BsStarFill key={uuidv4()} className="tutor-profile__info--star"/> : <BsStar key={uuidv4()} className="tutor-profile__info--star"/>
          ))}</span> : user.role === 'tutor' ? <span>No ratings yet</span> : <Link to={{
            pathname:'/review', 
            state: reviewState
          }}>Review this session</Link>}
      </p>
    </div>
  )
}
