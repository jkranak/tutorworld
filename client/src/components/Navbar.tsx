import {Link} from 'react-router-dom';
import {FaSignOutAlt, FaUserAlt} from 'react-icons/fa'

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to='/dashboard'>Dashboard</Link>
      <button className="navbar__button">Conversations</button>
      <button className="navbar__button">Calendar</button>
      <button className="navbar__button">Find a Tutor</button>
      <button className="navbar__button"><FaUserAlt/></button>
      <button className="navbar__button"><FaSignOutAlt/></button>
    </div>
  )
}
