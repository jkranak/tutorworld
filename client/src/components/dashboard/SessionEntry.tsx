import { useEffect, useState, FC } from 'react';
import {Link} from 'react-router-dom';
import { SessionComplex } from '../../interfaces/Session';
import {UserRole, emptyUserNameImage} from '../../interfaces/User';
import noPhotoUser from '../../assets/no_photo_user.png';
import { BsFillInfoCircleFill} from 'react-icons/bs'

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

    const sessionDetailState = {
      type: 'upcoming',
      name: `${otherUserInfo.firstName} ${otherUserInfo.lastName}`,
      image: otherUserInfo.imageUrl,
      date: session.date,
      time: session.time,
      cost: session.cost,
      context: session.sessionContext
    }


  return (
    <div className="dashboard__content--display--session">
      <div className="image-box">
          {otherUserInfo.imageUrl 
            ? <img src={otherUserInfo.imageUrl} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} height="40px" />
            : <img src={noPhotoUser} alt={`${otherUserInfo.firstName} ${otherUserInfo.lastName}`} height="40px" />}
      </div>
      <div className="dashboard__content--display--session-details">
        <div className="dashboard__content--display--session--left-box">
          <h2>{otherUserInfo.firstName} {otherUserInfo.lastName}</h2>
          <span>{new Date(`${session.date}T00:00:00`).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</span>
          <span>{session.time}</span>
        </div>
        <div className="dashboard__content--display--session--right-box">
          <h2>Price: ${session.cost}</h2>
          <span>{session.sessionContext}</span>
        </div>
      </div>
      <Link to={{
      pathname:'/session', 
      state: sessionDetailState
      }}><BsFillInfoCircleFill className="dashboard__content--display--title--number" /></Link>
    </div>
  )
}
