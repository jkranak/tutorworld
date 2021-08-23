import {FC} from 'react';
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid';
import { starRating } from '../../services/starRating';
import {TutorWithAvailability} from '../../interfaces/Tutor';
import {dayNames, capitalDayNames} from '../../assets/times';

interface Props {
  tutorDetails: TutorWithAvailability
}

export const ProfileTutorView: FC<Props> = ({tutorDetails}: Props) => {
  const starArr: number[] = tutorDetails && starRating(tutorDetails.rating!);
  
  return (
    <div className="tutor-profile">
      <section className="tutor-profile__left-box">
        <div className="image-box">
          {/* not making this optional because tutors are required a photo */}
          <img src={tutorDetails.imageUrl} alt={`${tutorDetails.firstName} ${tutorDetails.lastName}`} />
        </div>
        <h1 className="tutor-profile--title">{tutorDetails.firstName} {tutorDetails.lastName}</h1>
        <p className="tutor-profile--details">{tutorDetails.description}</p>
        <p className="tutor-profile--sub-title">Rate: ${tutorDetails.price}/hour</p>
      </section>
      <section className="tutor-profile__right-box">
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Education:</p>
          <p className="tutor-profile--details">{tutorDetails.education}</p>
        </div>
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Subjects:</p>
          <div>
          {tutorDetails.subjectLevels?.map(subject => (<span key={uuidv4()} className="tutor-profile__info--tag">{subject}</span>))}
          </div>
        </div>
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Languages:</p>
          <div>
            {tutorDetails.languages?.map(language => (<span key={uuidv4()} className="tutor-profile__info--tag">{language}</span>))}
          </div>
        </div>
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Rating</p>
          {tutorDetails.rating > 0 ? <span>{starArr?.map(el => (
            el === 2 ? <BsStarFill key={uuidv4()} className="tutor-profile__info--star"/> : el === 1 ? <BsStarHalf key={uuidv4()} className="tutor-profile__info--star"/> : <BsStar key={uuidv4()} className="tutor-profile__info--star"/>
          ))}</span> : <span>No ratings yet</span>}
        </div>
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Experience</p>
          <p className="tutor-profile--details">
            {tutorDetails.experience}
          </p>
        </div>
        <p>Weekly Availability</p>
          {dayNames.map((day, index) => (
            <li key={day}>{capitalDayNames[index]}: {Object.keys(tutorDetails.availability[day]).join(', ')}</li>
          ))}
      </section>
    </div>
  )
}
