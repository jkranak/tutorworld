import { FC, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { SessionDetail } from '../interfaces/Session';
import { starRatingWhole } from '../services/starRating';
import { deleteSession } from '../services/apiUser';
import {hoursSpace} from '../assets/times';

interface Props {
  sessionInfo: SessionDetail
}

export const SessionDetailStudent: FC<Props> = ({sessionInfo}: Props) => {
  const [error, setError] = useState(false);
  const [tooLate, setTooLate] = useState(false);
  const starArr = starRatingWhole(sessionInfo.rating);
  const history = useHistory();

  const reviewState = {
    date: sessionInfo.date,
    time: sessionInfo.time,
    name: sessionInfo.name,
    rating: sessionInfo.rating ? sessionInfo.rating : 0,
    review: sessionInfo.review ? sessionInfo.review : ''
  }

  useEffect(() => {
    const date = new Date(`${sessionInfo.date} ${hoursSpace.indexOf(sessionInfo.time)}:00`);
    const today = new Date();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if ((Number(date) - Number(today)) < twentyFourHours) {
      setTooLate(true);
    }
  }, [sessionInfo.date, sessionInfo.time])


  const handleDelete = async () => {
    const res = await deleteSession(sessionInfo.id);
    if (res === 204){
      history.push('/dashboard')
    } else setError(true);
  }

  return (
    <div className="session-details__right-box">
      <section className="session-details--left">
        <div className="image-box">
          <img src={sessionInfo.image} alt={sessionInfo.name}/>
        </div>
        <h1>{sessionInfo.name}</h1>
      </section>
      <section className="session-details--right">
        <p>Date: {new Date(`${sessionInfo.date}T00:00:00`).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
        <p>Time: {sessionInfo.time}</p>
        <p>Price: ${sessionInfo.cost}</p>
        <p>{sessionInfo.context}</p>
        {sessionInfo.type === 'history' ?
        <div>
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
        </div> : (!tooLate && <button onClick={handleDelete} disabled={tooLate} className="btn btn--blue" >Cancel Session</button>)}
        {tooLate && <p className="cant-cancel">Sessions cannot be cancelled less than 24 hours before start time.</p>}
        {error && <p>Error cancelling session</p>}
      </section>
    </div>
  )
}
