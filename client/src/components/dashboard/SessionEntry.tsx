import { useEffect, useState, FC } from 'react';
import { SessionComplex } from '../../interfaces/Session';
import {UserRole, emptyUserNameImage} from '../../interfaces/User';
import noPhotoUser from '../../assets/no_photo_user.png';
import moment from 'moment';

interface Props {
  session: SessionComplex
  user: UserRole
}

export const SessionEntry: FC<Props> = ({session, user}: Props) => {
  const [otherUserInfo, setOtherUserInfo] = useState(emptyUserNameImage);
  
  useEffect(() => {
    const firstName = user.role === 'tutor' ? session.Student.firstName : session.Tutor.firstName;
    const lastName = user.role === 'tutor' ? session.Student.lastName : session.Tutor.lastName;
    const imageUrl = user.role === 'tutor' ? session.Student.imageUrl : session.Tutor.TutorInfo.imageUrl;
    setOtherUserInfo({firstName, lastName, imageUrl})
    }, [session.Student.firstName, session.Student.imageUrl, session.Student.lastName, session.Tutor.TutorInfo.imageUrl, session.Tutor.firstName, session.Tutor.lastName, user.role])

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
