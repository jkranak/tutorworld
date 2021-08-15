import profileIcon from '../assets/profile.svg';
import signOutIcon from '../assets/signout.png';
import {Link} from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to='/dashboard'>Dashboard</Link>
      <button className="navbar__button">Conversations</button>
      <button className="navbar__button">Calendar</button>
      <button className="navbar__button">Find a Tutor</button>
      <button className="navbar__button"><img src={profileIcon} height="20px" alt="profile"></img></button>
      <button className="navbar__button"><img src={signOutIcon} height="20px" alt="profile"></img></button>
    </div>
  )
}
