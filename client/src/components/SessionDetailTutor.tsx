import { FC } from 'react';
import { SessionDetail } from '../interfaces/Session';
import noPhotoUser from '../assets/no_photo_user.png';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { starRatingWhole } from '../services/starRating';

interface Props {
  sessionInfo: SessionDetail
}

export const SessionDetailTutor: FC<Props> = ({sessionInfo}: Props) => {
  const starArr = starRatingWhole(sessionInfo.rating);

  return (
    <div className="session-details__right-box">
      <section className="session-details--left">
        <div className="image-box">
          <img src={sessionInfo.image ? sessionInfo.image : noPhotoUser} alt={sessionInfo.name} />
        </div>
        <h1>{sessionInfo.name}</h1>
      </section>
      <section className="session-details--right">
        <p>Date: {new Date(`${sessionInfo.date}T00:00:00`).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
        <p>Time: {sessionInfo.time}</p>
        <p>Price: ${sessionInfo.cost}</p>
        <p>{sessionInfo.context}</p>
          {sessionInfo.type === 'history' && 
          <div>
            <p>Review:</p>
            {starArr.map((el, index) => (
              <span key={index} className="tutor-card__middle-box--star">
                {el === 2 
                  ? <BsStarFill className="normalstar" />
                  : <BsStar className="normalstar" />}
              </span>))}
            <p>{sessionInfo.review}</p>
          </div>}
      </section>
    </div>
  )
}
