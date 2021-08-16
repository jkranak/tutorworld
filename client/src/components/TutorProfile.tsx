import { useState } from 'react';
import {TutorInfo, emptyTutorInfo } from '../interfaces/TutorInfo';
import {Tutor, emptyTutor} from '../interfaces/Tutor';
import {BsStarFill, BsStar, BsStarHalf} from 'react-icons/bs'
import { starRating } from '../services/starRating';

interface Props {
  setEditing: (editing: boolean) => void
}

export const TutorProfile = ({setEditing}: Props) => {
  const [tutorInfo, setTutorInfo] = useState(emptyTutorInfo);
  const [tutor, setTutor] = useState(emptyTutor);
  const [tutorSubjects, setTutorSubjects] = useState([]);
  const [tutorLanguages, setTutorLanguages] = useState([])

  const starArr: number[] = starRating(tutorInfo.rating);

  function editClick () {
    setEditing(true);
  }

  return (
    <div>
      <img src={tutorInfo.imageURL} alt={`${tutor.firstName} ${tutor.lastName}`} />
      <h3>{tutor.firstName} {tutor.lastName}</h3>
      <p>{tutorInfo.description}</p>
      <p>Rate: ${tutorInfo.price}/hour</p>
      <button>Schedule</button>
      <button>Message</button>
      <h3>Education:</h3>
      <p>{tutorInfo.education}</p>
      <h3>Subjects:</h3>
      <ul>{tutorSubjects.map(subject => (<li>{subject}</li>))}</ul>
      <h3>Languages:</h3>
      <ul>{tutorLanguages.map(language => (<li>{language}</li>))}</ul>
      <h3>Rating</h3>
      {starArr.map(el => (
        el === 2 ? <BsStarFill/> : el === 1 ? <BsStarHalf/> : <BsStar/>
      ))}
      <h3>Experience</h3>
      {tutorInfo.experience}
      <button onClick={editClick}>Edit Profile</button>
    </div>
  )
}
