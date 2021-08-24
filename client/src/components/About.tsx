import {FC} from 'react';
import biancaImg from '../assets/bianca.jpg'
import rahmatImg from '../assets/rahmat.jpg'
import josephImg from '../assets/joseph.jpg'

export const About: FC = () => {
  return (
    <div className="landing__body">
      <div className="landing__body--box">
        <div className="image-box">
          <img src={biancaImg} alt="bianca"></img>
        </div>
        <div className="landing__body--text">
          <h2>Bianca: Master of the dark arts of CSS and Sass, she did most of the styling, implemented Redux, and created the messaging using Socket.io</h2>
        </div>
      </div>
        <div className="landing__body--box">
          <div className="landing__body--text">
            <h2>Rahmat: The Socket.io maestro, he created almost all the back end and implement our video and whiteboard with Socket.io and Google Maps integration.</h2>
          </div>
          <div className="image-box">
            <img src={rahmatImg} alt="Rahmat"></img>
          </div>
        </div>
        <div className="landing__body--box">
          <div className="image-box">
            <img src={josephImg} alt="Joseph"></img>
          </div>
          <div className="landing__body--text">
            <h2>Joseph: A front end guru, he created most of the other pages on the front end and added the Strip payment.</h2>
          </div>
        </div>
    </div>
  )
}

{/*  */}