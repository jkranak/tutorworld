import { Link, useHistory } from 'react-router-dom';
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../redux/actions/authenticate';
import LogoLink from './LogoLink';
import { RootState } from '../redux/store/store';
import { UserAuth } from '../interfaces/User';

export const Navbar = () => {
  const user: UserAuth = useSelector((state: RootState) => state.authenticate)
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('x-auth-token');
    dispatch(authenticate(false));
    history.push('/');
  }

  return (
    <div className="navbar">
      <div className="navbar--left-box">
        <LogoLink />
        <Link to='/dashboard' className="btn btn--clear">Dashboard</Link>
        <Link to={'/messages'}className="btn btn--clear">Messages</Link>
        <Link to={'/calendar'} className="btn btn--clear">Calendar</Link>
        {user.role === 'student' && <Link to={{pathname: '/search', state: {search: false}}} className="btn btn--clear">Find a Tutor</Link>}
        {user.role !== 'tutor' && <Link to={'/application'} className="btn btn--clear">Apply to be a tutor</Link>}
      </div>
      <div className="navbar--right-box">
        <Link to={'/profile'} className="btn btn--clear"><FaUserAlt/></Link>
        <div className="btn btn--clear" onClick={handleLogout} ><FaSignOutAlt/></div>
      </div>
    </div>
  )
}
