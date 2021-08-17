import { useState, FC } from 'react';
import { emptyTutorAndInfo} from '../interfaces/Tutor';
import {BsStarFill, BsStar, BsStarHalf} from 'react-icons/bs'
import { starRating } from '../services/starRating';

export const TutorProfile: FC = () => {
  const [tutor, setTutor] = useState(emptyTutorAndInfo);
  const [tutorSubjects, setTutorSubjects] = useState([]);
  const [tutorLanguages, setTutorLanguages] = useState([])

  const starArr: number[] = starRating(tutor.rating);

  return (
    <div>
      <img src={tutor.imageURL} alt={`${tutor.firstName} ${tutor.lastName}`} />
      <h3>{tutor.firstName} {tutor.lastName}</h3>
      <p>{tutor.description}</p>
      <p>Rate: ${tutor.price}/hour</p>
      <button>Schedule</button>
      <button>Message</button>
      <h3>Education:</h3>
      <p>{tutor.education}</p>
      <h3>Subjects:</h3>
      <ul>{tutorSubjects.map(subject => (<li>{subject}</li>))}</ul>
      <h3>Languages:</h3>
      <ul>{tutorLanguages.map(language => (<li>{language}</li>))}</ul>
      <h3>Rating</h3>
      {starArr.map(el => (
        el === 2 ? <BsStarFill/> : el === 1 ? <BsStarHalf/> : <BsStar/>
      ))}
      <h3>Experience</h3>
      {tutor.experience}
    </div>
  )
}
