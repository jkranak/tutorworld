import { Link, useHistory } from 'react-router-dom';
import { useState, FC } from 'react';
import { About } from '../components/About';
import { LandingBody } from '../components/LandingBody';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import LogoLink from '../components/LogoLink';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../redux/actions/authenticate';
import { RootState } from '../redux/store/store';


export const Landing: FC = () => {
  const auth = useSelector((state: RootState) => state.authenticate);
  const [toggle, setToggle] = useState<string>('home');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('x-auth-token');
    dispatch(authenticate(false));
    history.push('/');
  }
 
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
          <div className="navbar--right-box">
            <Link to={'/dashboard'} className="btn btn--blue">
              <span>DASHBOARD</span>
            </Link>
            <div className="btn btn--clear" onClick={handleLogout} ><FaSignOutAlt/></div>
          </div>
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

