import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs'
import { TutorInfo } from '../interfaces/Tutor';
import { starRating } from '../services/starRating';
import { v4 as uuidv4 } from 'uuid';

interface Props {
 tutor: TutorInfo | null;
}

export const TutorProfile = ({ tutor }: Props) => {
  const starArr: number[] | null = tutor && starRating(tutor?.TutorInfo.rating);

  return (
    tutor &&
    <div>
      <img src={tutor.TutorInfo.imageUrl} alt={`${tutor.firstName} ${tutor.lastName}`} />
      <h3>{tutor.firstName} {tutor.lastName}</h3>
      <p>{tutor.TutorInfo.description}</p>
      <p>Rate: ${tutor.TutorInfo.price}/hour</p>
      <button>Schedule</button>
      <button>Message</button>
      <h3>Education:</h3>
      <p>{tutor.TutorInfo.education}</p>
      <h3>Subjects:</h3>
      <ul>{tutor.TutorInfo.subjects?.map(subject => (<li key={uuidv4()}>{subject}</li>))}</ul>
      <h3>Languages:</h3>
      <ul>{tutor.TutorInfo.languages?.map(language => (<li key={uuidv4()}>{language}</li>))}</ul>
      <h3>Rating</h3>
      {starArr?.map(el => (
        el === 2 ? < BsStarFill/> : el === 1 ? <BsStarHalf/> : <BsStar/>
      ))}
      <h3>Experience</h3>
      {tutor.TutorInfo.experience}
    </div>
  )
}
