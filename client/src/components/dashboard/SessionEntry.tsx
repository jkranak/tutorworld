import { useEffect, useState, FC } from 'react';
import { getBasicUserInfo } from '../../services/apiUser';
import { Session } from '../../interfaces/Session';
import {UserRole, emptyUserNameImage} from '../../interfaces/User';
import noPhotoUser from '../../assets/no_photo_user.png';

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
    <div>
      <p>{otherUserInfo.imageUrl ? 
         <img src={otherUserInfo.imageUrl} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} height="40px" />
         :
         <img src={noPhotoUser} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} height="40px" />
        }{otherUserInfo.firstName} {otherUserInfo.lastName} - {session.date}, {session.time} - Price: ${session.cost} - {session.sessionContext}</p>
    </div>
  )
}
