import { FC } from 'react';
import {Link} from 'react-router-dom';
import chalkboard from '../assets/chalkboard.jpg';
import remote from '../assets/remote.jpg';
import book from '../assets/book.jpg';

export const LandingBody: FC = () => {
  return (
    <div className="landing__body">
      <div className="landing__body--box">
        <div className="image-box">
          <img src={chalkboard} alt="teacher at chalkboard"></img>
        </div>
        <div className="landing__body--text">
          <h2>At TutorWorld, you can find tutors ready to help you on many different subjects and at all levels.</h2>
        </div>
      </div>
        <div className="landing__body--box">
          <div className="landing__body--text">
            <h2>Connect with tutors online through our interactive classroom, which includes both video and whiteboard.</h2>
          </div>
          <div className="image-box">
            <img src={remote} alt="student learning online"></img>
          </div>
        </div>
        <div className="landing__body--box">
          <div className="image-box">
            <img src={book} alt="book and glasses"></img>
          </div>
          <div className="landing__body--text">
            <h2>Do you have the knowledge and skills to be a tutor yourself? <Link to={'/application'}>Apply to be a Tutor</Link>, and you can earn money, while being able to set your own rates and hours.</h2>
          </div>
        </div>
    </div>
  )
}
