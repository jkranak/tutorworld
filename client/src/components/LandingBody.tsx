import { FC } from 'react';
import { Link } from 'react-router-dom';
import mainImage from '../assets/landing_image.png';

export const LandingBody: FC = () => {
  return (
    <main className="landing__body">
      <section className="landing__body--box">
        <div className="landing__body--text">
          <h1 className="landing__body--title">Learn with the best tutors online or at your local library</h1>
          <h3 className="landing__body--sub-title">Prepare for exams, learn something new, improve your grades with the expertise of great tutors. Wide range of tutors available in a variety of languages, subjects, levels.</h3>
          <Link to={'/register'} className="btn btn--blue form--btn">Register</Link>
        </div>
        <div className="image-box">
          <img src={mainImage} alt="Tutor and student" />
        </div>
      </section>
    </main>
  )
}
