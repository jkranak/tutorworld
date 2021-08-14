import { useState } from "react"
import { Link } from "react-router-dom";
import { About } from "../components/About";
import { LandingBody } from "../components/LandingBody";

export const LandingPage = () => {
  const [toggle, setToggle] = useState<string>('home');

  return (
    <div className="landing">

      <header className="landing__header">
        <div className="landing__header--left-box">
          {toggle === 'home' && <a 
          onClick={() => setToggle('about')}
          className="btn btn--clear">
          About Us
          </a> }
          {toggle === 'about' && <a 
          onClick={() => setToggle('home')}
          className="btn btn--clear">
          Home
          </a>}
        </div>
        <div className="landing__header--right-box">
          <Link to={'/application'} className="btn btn--clear">Apply to be a Tutor</Link>
          <Link to={'/login'} className="btn btn--blue">Login/Register</Link>
        </div>
      </header>

      {toggle === 'home' && <LandingBody/>}
      {toggle === 'about' && <About />}
    </div>
  )
}
