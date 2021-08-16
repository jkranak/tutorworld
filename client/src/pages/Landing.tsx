import { useState } from 'react'
import { Link } from 'react-router-dom';
import { About } from '../components/About';
import { LandingBody } from '../components/LandingBody';
import { FaUser } from 'react-icons/fa';

export const Landing = () => {
  const [toggle, setToggle] = useState<string>('home');

  return (
    <div className="landing">

      <header className="landing__header">
        <div className="landing__header--left-box">
          {toggle === 'home' && <div
          onClick={() => setToggle('about')}
          className="btn btn--clear">
          About Us
          </div> }
          {toggle === 'about' && <div 
          onClick={() => setToggle('home')}
          className="btn btn--clear">
          Home
          </div>}
        </div>
        <div className="landing__header--right-box">
          <Link to={'/application'} className="btn btn--clear">Apply to be a Tutor</Link>
          <Link to={'/login'} className="btn btn--blue">
            <span className="before-icon">SIGN IN</span>
            <FaUser className="lib-icon"/>
          </Link>
        </div>
      </header>
      {toggle === 'home' && <LandingBody/>}
      {toggle === 'about' && <About />}
    </div>
  )
}
