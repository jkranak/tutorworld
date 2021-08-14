// import chalkboard from '../Assets/chalkboard.jpg'
// import remote from '../Assets/remote.png'
// import book from '../Assets/book.jpg'
import {Application} from './Application'

interface Props {
  
}

export const LandingPage = (props: Props) => {
  return (
    <div>
      <div id="landingheader">
        <p>About Us</p>
        <p>Apply to be a Tutor</p>
        <p>Login/Register</p>
      </div>
      <div id="landingbody">
        {/* <div className="landing">
          <img src={chalkboard} alt="teacher at chalkboard" width="350px"></img>
          <p>Find tutors on any subject</p>
        </div>
        <div className="landing">
          <p>Online tutoring with video and whiteboard</p>
          <img src={remote} width="350px" alt="student learning online"></img>
        </div>
        <div className="landing">
          <img src={book} width="350px" alt="book and glasses"></img>
          <p>Earn money tutoring. Set your own availability and hourly rate</p>
        </div> */}
      </div>
      <Application/>
    </div>
  )
}
