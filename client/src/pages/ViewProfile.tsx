import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs'
import { starRating } from '../services/starRating';
import { v4 as uuidv4 } from 'uuid';
import { dayNames, capitalDayNames } from '../assets/times';

export const ViewProfile = () => {
  const tutorDetails = useSelector((state: any )=> state.currentTutorInfo);
  const starArr: number[] = tutorDetails && starRating(tutorDetails.rating!);

  return (
    <>
    <Navbar />
    <div className="tutor-profile">
      <section className="tutor-profile__left-box">
        <div className="image-box">
          <img src={tutorDetails.imageUrl} alt={`${tutorDetails.firstName} ${tutorDetails.lastName}`} />
        </div>
        <h1 className="tutor-profile--title">{tutorDetails.firstName} {tutorDetails.lastName}</h1>
        <p className="tutor-profile--details">{tutorDetails.description}</p>
        <p className="tutor-profile--sub-title">Rate: ${tutorDetails.price}/hour</p>
        <Link to={'/schedule'} className="btn btn--blue">Schedule</Link>
        <button className="btn btn--blue">Message</button>

      </section>
      <section className="tutor-profile__right-box">
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Education:</p>
          <p className="tutor-profile--details">{tutorDetails.education}</p>
        </div>
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Subjects:</p>
          <div>
          {tutorDetails.subjectLevels?.map((subject: string) => (<span key={uuidv4()} className="tutor-profile__info--tag">{subject}</span>))}
          </div>
        </div>
        <div className="tutor-profile__info-wrapper">
          <p className="tutor-profile--sub-title">Languages:</p>
          <div>
            {tutorDetails.languages?.map((language: string) => (<span key={uuidv4()} className="tutor-profile__info--tag">{language}</span>))}
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
            {tutorDetails.experience}
          </p>
        </div>
        <div>
          <p>Weekly Availability</p>
          {dayNames.map((day, index) => (
            <li key={day}>{capitalDayNames[index]}: {Object.keys(tutorDetails.availability[day]).join(', ')}</li>
          ))}
          <p>Some slots may already be booked. Click on Schedule to see up-to-date availability.</p>
        </div>
      </section>
    </div>
    </>
  )
}
