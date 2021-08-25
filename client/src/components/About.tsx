import {FC} from 'react';
import biancaImg from '../assets/bianca.jpg'
import rahmatImg from '../assets/rahmat.jpg'
import josephImg from '../assets/joseph.jpg'

export const About: FC = () => {
  return (
    <div className="landing__about">
      <section className="landing__about--description">
        <h1>Student success is at the heart of everything we do.</h1>
        <h3>At Tutor World, our aim is to offer you the best platform to be able to learn from top rated tutors. Not only are we able to host in app online tutoring sessions, but you can also find tutors that are available at your local libraries. Our tutors are highly vetted in order to provide only the best tutors on our platform. Both our students and tutors are our top priority and through our app we work hard towards building long-lasting and meaningful relations with them.</h3>
      </section>
      <section className="landing__about--content">
        <div className="landing__about--card">
          <div className="landing__about--card--left">
            <div className="image-box">
              <img src={biancaImg} alt="Bianca"/>
            </div>
            <p className="landing__about--card--name">Bianca</p>
          </div>
          <p className="landing__about--card--right">Master of the dark arts of CSS and Sass, she did most of the styling, implemented Redux, and created the messaging using Socket.io</p>
        </div>
        <div className="landing__about--card">
          <div className="landing__about--card--left">
            <div className="image-box">
              <img src={rahmatImg} alt="Rahmat"/>
            </div>
            <p className="landing__about--card--name">Rahmat</p>
          </div>
          <p className="landing__about--card--right">The Socket.io maestro, he created almost all the back end and implement our video and whiteboard with Socket.io and Google Maps integration.</p>
        </div>

        <div className="landing__about--card">
          <div className="landing__about--card--left">
            <div className="image-box">
              <img src={josephImg} alt="Joseph"/>
            </div>
            <p className="landing__about--card--name">Joseph</p>
          </div>
          <p className="landing__about--card--right">A front end guru, he created most of the other pages on the front end and added the Strip payment</p>
        </div> 
      </section>
    </div>
  )
}