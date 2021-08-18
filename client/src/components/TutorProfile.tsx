import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs'
import { TutorComplete } from '../interfaces/Tutor';
import { starRating } from '../services/starRating';
import { v4 as uuidv4 } from 'uuid';

interface Props {
 tutor: TutorComplete | null;
}

export const TutorProfile = ({ tutor }: Props) => {
  const starArr: number[] | null = tutor && starRating(tutor.rating);
  console.log('tutor', tutor)
  return (
    tutor &&
    <div>
      <img src={tutor.imageUrl} alt={`${tutor.firstName} ${tutor.lastName}`} />
      <h3>{tutor.firstName} {tutor.lastName}</h3>
      <p>{tutor.description}</p>
      <p>Rate: ${tutor.price}/hour</p>
      <button>Schedule</button>
      <button>Message</button>
      <h3>Education:</h3>
      <p>{tutor.education}</p>
      <h3>Subjects:</h3>
      <ul>{tutor.subjectLevels?.map(subject => (<li key={uuidv4()}>{subject}</li>))}</ul>
      <h3>Languages:</h3>
      <ul>{tutor.languages?.map(language => (<li key={uuidv4()}>{language}</li>))}</ul>
      <h3>Rating</h3>
      {starArr?.map(el => (
        el === 2 ? <BsStarFill key={uuidv4()}/> : el === 1 ? <BsStarHalf key={uuidv4()} /> : <BsStar key={uuidv4()}/>
      ))}
      <h3>Experience</h3>
      {tutor.experience}
    </div>
  )
}
