import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux"
import noPhotoUser from '../assets/no_photo_user.png';
import { getStudentDetails, getTutorDetails } from "../services/apiUser";
interface Props {
  messagesList: [],
  sendMessage: Function
}

export const MessagesContainer = ({ messagesList, sendMessage }: Props) => {
  // TO-DO fix typescript any
  const user = useSelector((state: any) => state.authenticate);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    if (user.role === 'student') {
      getStudentDetails().then(res => {
        setUserDetails(res);
      })
    } else if (user.role === 'tutor') {
      getTutorDetails(user.id).then(res => {
        setUserDetails(res);
      })
    }
  }, [])

  return (
    <main className="messages__content">
      <section className="messages__content--box">
        <div className="messages__content--left-box">
          <div className="messages__content--contact me">
            <div className="image-box">
              <img src={userDetails?.imageUrl ? userDetails?.imageUrl : noPhotoUser} alt={`${userDetails?.firstName} ${userDetails?.lastName}`} />
            </div>
            <span className="me__name">{`${userDetails?.firstName} ${userDetails?.lastName}`}</span>
          </div>
          <div>search</div>
          {/* map all rooms */}
          <div className="messages__content--contact">
            <div className="image-box">
              {/* <img src={userDetails?.imageUrl ? userDetails?.imageUrl : noPhotoUser} alt={`${userDetails?.firstName} ${userDetails?.lastName}`} /> */}
            </div>
          </div>
        </div>
        <div className="messages__content--right-box">
          <div className="messages__content--messages-list">
            <div className="messages__content--message--left">
              <span >message</span>
              <span >time</span>
            </div>
            <div className="messages__content--message--right">
              <span >message</span>
              <span >time</span>
            </div>
          </div>
          <div className="messages__content--send-message">
            <input type="text" />
            <button><FiChevronRight /></button>
          </div>
        </div>
      </section>
    </main>
  )
}
