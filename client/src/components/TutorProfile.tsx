import { useState } from 'react';
import {TutorInfo, emptyTutorInfo } from '../interfaces/TutorInfo';
import {Tutor, emptyTutor} from '../interfaces/Tutor';

export const TutorProfile = () => {
  const [tutorInfo, setTutorInfo] = useState(emptyTutorInfo);
  const [tutor, setTutor] = useState(emptyTutor);
  return (
    <div>
      <img src={tutorInfo.imageURL} alt="profile picture" />
      <h3>{tutor.firstName} {tutor.lastName}</h3>
      <p>{tutorInfo.description}</p>
      <p>Rate: ${tutorInfo.price}/hour</p>
      <h3>Education:</h3>
      <p>{tutorInfo.education}</p>
    </div>
  )
}
