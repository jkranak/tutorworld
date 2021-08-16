import { useState } from 'react';
import {TutorInfo, emptyTutorInfo } from '../interfaces/TutorInfo';
import {Tutor, emptyTutor} from '../interfaces/Tutor';
import {BsStarFill, BsStar, BsStarHalf} from 'react-icons/bs'

export const TutorProfile = () => {
  const [tutorInfo, setTutorInfo] = useState(emptyTutorInfo);
  const [tutor, setTutor] = useState(emptyTutor);
  const starArr: number[] = starRating(tutorInfo.rating);

  function starRating (rating: number): number[] {
    rating = Math.round(rating * 2);
    const starArr: number[] = [];
      for (let i = 0; i < 5; i++) {
        if (rating >= 2) {
          starArr.push(2);
          rating -= 2;
        }
        else if (rating === 1) {
          starArr.push(1);
          rating -= 1;
        }
        else starArr.push(0);
      }
      return starArr;
    }

  return (
    <div>
      <img src={tutorInfo.imageURL} alt="profile" />
      <h3>{tutor.firstName} {tutor.lastName}</h3>
      <p>{tutorInfo.description}</p>
      <p>Rate: ${tutorInfo.price}/hour</p>
      <button>Schedule</button>
      <button>Message</button>
      <h3>Education:</h3>
      <p>{tutorInfo.education}</p>
      <h3>Subjects:</h3>
      <h3>Languages:</h3>
      <h3>Rating</h3>
      {starArr.map(el => (
        el === 2 ? <BsStarFill/> : el === 1 ? <BsStarHalf/> : <BsStar/>
      ))}
      <h3>Experience</h3>
      {tutorInfo.experience}
    </div>
  )
}
