import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { About } from '../components/About';
import { LandingBody } from '../components/LandingBody';
import { FaUser } from 'react-icons/fa';
import Logo from '../components/Logo';
import { authenticate } from '../redux/actions/authenticate';

export const Landing = () => {
  const [toggle, setToggle] = useState<string>('home');
  // TO-DO fix typescript any
  const auth = useSelector((state: any) => state.authenticate);
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');
    if (token) {
      setIsAuthenticated(true)
      console.log(token);
      // dispatch(authenticate())
    };
  }, [auth])

  return (
    <div className="landing">

      <header className="landing__header">
        <Logo />
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
function jwtDecode(token: string) {
  throw new Error('Function not implemented.');
}

