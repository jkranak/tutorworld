import chalkboard from '../Assets/chalkboard.jpg'
import remote from '../Assets/remote.png'
import book from '../Assets/book.jpg'
import '../Css/LandingPage.css';
import {Register} from './Register';

interface Props {
  
}

export const LandingPage = (props: Props) => {
  return (
    <>
    <div>
      <div className="landing-page__header">
        <p>About Us</p>
        <p>Apply to be a Tutor</p>
        <p>Login/Register</p>
      </div>
      <div className="landing-page__body">
        <div className="landing-page__el">
          <img src={chalkboard} alt="teacher at chalkboard" width="350px"></img>
          <p>Find tutors on any subject</p>
        </div>
        <div className="landing-page__el">
          <p>Online tutoring with video and whiteboard</p>
          <img src={remote} width="350px" alt="student learning online"></img>
        </div>
        <div className="landing-page__el">
          <img src={book} width="350px" alt="book and glasses"></img>
          <p>Earn money tutoring. Set your own availability and hourly rate</p>
        </div>
      </div>
    </div>
    <Register/>
    </>
  )
}
