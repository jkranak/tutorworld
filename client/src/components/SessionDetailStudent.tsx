import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { SessionDetail } from '../interfaces/Session';
import { starRatingWhole } from '../services/starRating';


interface Props {
  sessionInfo: SessionDetail
}

export const SessionDetailStudent: FC<Props> = ({sessionInfo}: Props) => {
  const starArr = starRatingWhole(sessionInfo.rating);
  
  const reviewState = {
    date: sessionInfo.date,
    time: sessionInfo.time,
    name: sessionInfo.name,
    rating: sessionInfo.rating ? sessionInfo.rating : 0,
    review: sessionInfo.review ? sessionInfo.review : ''
  }

  return (
    <div>
      <p>Tutor Name: {sessionInfo.name}</p>
      <img src={sessionInfo.image} alt={sessionInfo.name} height="100px"/>
      <p>Date: {new Date(`${sessionInfo.date}T00:00:00`).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
      <p>Time: {sessionInfo.time}</p>
      <p>Price: ${sessionInfo.cost}</p>
      <p>{sessionInfo.context}</p>
      {sessionInfo.type === 'history' && 
         <>
        <p>Review:</p>
        {starArr.map((el, index) => (
          <span key={index} className="tutor-card__middle-box--star">
            {el === 2 
              ? <BsStarFill className="normalstar" />
              : <BsStar className="normalstar" />}
          </span>))}
        <p>{sessionInfo.review}</p>
        <Link className="btn btn--clear" to={{
                pathname:'/review', 
                state: reviewState
              }}>Update Review</Link>
      </>}
    </div>
  )
}
