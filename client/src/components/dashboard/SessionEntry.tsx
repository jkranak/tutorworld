import { useEffect, useState, FC } from 'react';
import { getBasicUserInfo } from '../../services/apiUser';
import { Session } from '../../interfaces/Session';
import {UserRole, emptyUserNameImage} from '../../interfaces/User';
import noPhotoUser from '../../assets/no_photo_user.png';
import moment from 'moment';

interface Props {
  session: Session
  user: UserRole
}

export const SessionEntry: FC<Props> = ({session, user}: Props) => {
  const [otherUserInfo, setOtherUserInfo] = useState(emptyUserNameImage);
  
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
        <div className="dashboard__content--display--session--left-box">
          <h2>{otherUserInfo.firstName} {otherUserInfo.lastName}</h2>
          <span>{moment(session.date).format('YYYY MMM DD')}</span>
          <span>{session.time}</span>
        </div>
        <div className="dashboard__content--display--session--right-box">
          <h2>Price: ${session.cost}</h2>
          <span>{session.sessionContext}</span>
        </div>
      </div>
    </div>
  )
}
