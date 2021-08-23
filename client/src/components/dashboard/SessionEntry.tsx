import { useEffect, useState, FC } from 'react';
import { SessionComplex } from '../../interfaces/Session';
import {UserRole, emptyUserNameImage} from '../../interfaces/User';
import noPhotoUser from '../../assets/no_photo_user.png';

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
    <div>
      <p>{otherUserInfo.imageUrl ? 
         <img src={otherUserInfo.imageUrl} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} height="40px" />
         :
         <img src={noPhotoUser} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} height="40px" />
        }{otherUserInfo.firstName} {otherUserInfo.lastName} - {session.date}, {session.time} - Price: ${session.cost} - {session.sessionContext}</p>
    </div>
  )
}
