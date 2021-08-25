import { FormEvent, FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { starRatingWhole } from '../services/starRating';
import { updateRating } from '../services/apiUser';

interface Props {
  sessionInfo: {
    date: string
    time: string
    name: string
    rating: number
    review: string
  }
}

export const ReviewComponent: FC<Props> = ({sessionInfo}: Props) => {
  const [rating, setRating] = useState(sessionInfo.rating);
  const [review, setReview] = useState(sessionInfo.review);
  const [starArr, setStarArr] = useState(starRatingWhole(rating));
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleRating = (index: number) => {
    setRating(index + 1);
    setStarArr(starRatingWhole(index + 1));
    setError(false);
  }

  const handleHover = (index: number) => {
    let newArray = [];
    for (let i = 0; i < 5; i++) {
      if (i <= index) newArray.push(1);
      else newArray.push(0);
    }
    setStarArr(newArray);
  }

  const handleMouseLeave = () => {
    setStarArr(starRatingWhole(rating))
  }

  const handleChange = (event: {target: {value: string}}) => {
    setReview(event.target.value);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (rating === 0) setError(true);
    else {
      updateRating(rating, review, sessionInfo.date, sessionInfo.time).then((res: number) => {
        if (res === 200) history.push('/dashboard')
      })
    }
  }
  
  return (
    <div className="review">
      <form onSubmit={handleSubmit} >
        <h1>Rate and review your session from {sessionInfo.time} on {new Date(`${sessionInfo.date}T00:00:00`).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})} with {sessionInfo.name}</h1>
        <div>
          {starArr.map((el, index) => (
              <span key={index} className="tutor-card__middle-box--star">{el === 2 
                ? <button onClick={() => handleRating(index)} onMouseEnter={() => handleHover(index)} ><BsStarFill className="normalstar" /></button>
                : el === 1 
                  ? <button onClick={() => handleRating(index)} onMouseEnter={() => handleHover(index)} className="hoverstar" onMouseLeave={handleMouseLeave}><BsStarFill /></button>
                  : <button onClick={() => handleRating(index)} onMouseEnter={() => handleHover(index)}><BsStar className="normalstar" /></button>
              }</span>
          ))}
        </div>
        <textarea id="review" onChange={handleChange} value={review} placeholder="Enter your review here" className="text-input text-input--blue" />
        {error && <h3>Please rate the session between 1 and 5 stars</h3>}
        <button type="submit" className="btn btn--blue">Submit</button>
      </form>
    </div>
  )
}
