import { FC } from 'react';
import chalkboard from '../assets/chalkboard.jpg';
import remote from '../assets/remote.png';
import book from '../assets/book.jpg';

interface Props {
  
}

export const LandingBody: FC<Props> = (props: Props) => {
  return (
    <div className="landing-body">
      <div className="landing-body--box">
          <img src={chalkboard} alt="teacher at chalkboard" width="350px"></img>
          <h2>Find tutors on any subject</h2>
        </div>
        <div className="landing-body--box">
          <h2>Online tutoring with video and whiteboard</h2>
          <img src={remote} width="350px" alt="student learning online"></img>
        </div>
        <div className="landing-body--box">
          <img src={book} width="350px" alt="book and glasses"></img>
          <h2>Earn money tutoring. Set your own availability and hourly rate</h2>
        </div>
    </div>
  )
}
