import {FC, useState, useEffect} from 'react';
import { getBasicUserInfo } from '../../services/apiUser';
import {starRating} from '../../services/starRating';
import { HistoryI } from '../../interfaces/Session';
import {UserRole, emptyUserNameImage} from '../../interfaces/User';
import noPhotoUser from '../../assets/no_photo_user.png';
import {BsStarFill, BsStar} from 'react-icons/bs'

interface Props {
  session: HistoryI
  user: UserRole
}

export const HistoryEntry: FC<Props> = ({session, user}: Props) => {
  const [otherUserInfo, setOtherUserInfo] = useState(emptyUserNameImage);
  const starArr: number[] = starRating(session.starRating);

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
        {otherUserInfo.firstName} {otherUserInfo.lastName} - {session.date}, {session.time} - Price: ${session.cost} - {session.review} - 
        {starArr.map((el, index) => (
          <span key={index} className="tutor-card__middle-box--star">{el === 2 ? <BsStarFill /> : <BsStar/>}</span>
        ))}
      </p>
    </div>
  )
}
