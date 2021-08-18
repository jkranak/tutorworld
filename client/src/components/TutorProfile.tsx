import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs'
import { TutorComplete } from '../interfaces/Tutor';
import { starRating } from '../services/starRating';
import { v4 as uuidv4 } from 'uuid';

interface Props {
 tutor: TutorComplete | null;
}

export const TutorProfile = ({ tutor }: Props) => {
  const starArr: number[] | null = tutor && starRating(tutor.rating);
  
  return (
    tutor &&
    <div className="tutor-profile">
      <section className="tutor-profile__left-box">
        <div className="image-box">
          {/* not making this optional because tutors are required a photo */}
          <img src={tutor.imageUrl} alt={`${tutor.firstName} ${tutor.lastName}`} />
        </div>
        <h1 className="tutor-profile--title">{tutor.firstName} {tutor.lastName}</h1>
        <p className="tutor-profile--details">{tutor.description}</p>
        <p className="tutor-profile--sub-title">Rate: ${tutor.price}/hour</p>
        <button className="btn btn--blue">Schedule</button>
        <button className="btn btn--blue">Message</button>

      </section>
      <section className="tutor-profile__right-box">
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Education:</p>
          <p className="tutor-profile--details">{tutor.education}</p>
        </div>
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Subjects:</p>
          <div>
          {tutor.subjectLevels?.map(subject => (<span key={uuidv4()} className="tutor-profile__info--tag">{subject}</span>))}
          </div>
        </div>
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Languages:</p>
          <div>
            {tutor.languages?.map(language => (<span key={uuidv4()} className="tutor-profile__info--tag">{language}</span>))}
          </div>
        </div>
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Rating</p>
          {starArr?.map(el => (
            el === 2 ? <BsStarFill key={uuidv4()} className="tutor-profile__info--star"/> : el === 1 ? <BsStarHalf key={uuidv4()} className="tutor-profile__info--star"/> : <BsStar key={uuidv4()} className="tutor-profile__info--star"/>
          ))}
        </div>
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Experience</p>
          <p className="tutor-profile--details">
            {tutor.experience}
          </p>
        </div>
      </section>
    </div>
  )
}
