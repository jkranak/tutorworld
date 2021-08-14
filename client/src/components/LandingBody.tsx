import chalkboard from '../assets/chalkboard.jpg';
import remote from '../assets/remote.png';
import book from '../assets/book.jpg';

interface Props {
  
}

export const LandingBody = (props: Props) => {
  return (
    <div className="landing-body">
      <div className="landing">
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
        </div>
    </div>
  )
}
