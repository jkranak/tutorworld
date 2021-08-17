import { Link } from 'react-router-dom';
import { useState, FC } from 'react';
import { About } from '../components/About';
import { LandingBody } from '../components/LandingBody';
import { FaUser } from 'react-icons/fa';
import LogoLink from '../components/LogoLink';
import { useSelector } from 'react-redux';


export const Landing: FC = () => {
  const auth = useSelector((state: any) => state.authenticate);
  const [toggle, setToggle] = useState<string>('home');
 
  return (
    <div className="landing">
      <header className="landing__header">
        <LogoLink />
        <div className="landing__header--right-box">
          {toggle === 'home' && <div
          onClick={() => setToggle('about')}
          className="btn btn--clear">
          About Us
          </div> }
          {toggle === 'about' && <div 
            onClick={() => setToggle('home')}
            className="btn btn--clear">
            Home
            </div>
          }
          <Link to={'/application'} className="btn btn--clear">Apply to be a Tutor</Link>
          {auth && Object.keys(auth).length ? 
            <Link to={'/dashboard'} className="btn btn--blue">
              <span>DASHBOARD</span>
            </Link>
          :
            <Link to={'/login'} className="btn btn--blue">
              <span className="before-icon">SIGN IN</span>
              <FaUser className="lib-icon"/>
            </Link>
          }
        </div>
      </header>
      {toggle === 'home' && <LandingBody/>}
      {toggle === 'about' && <About />}
    </div>
  )
}

