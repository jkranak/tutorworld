import {Link} from 'react-router-dom';
import {FaSignOutAlt, FaUserAlt} from 'react-icons/fa'

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar--left-box">
        <Link to='/dashboard' className="btn btn--clear">Dashboard</Link>
        <button className="btn btn--clear">Conversations</button>
        <button className="btn btn--clear">Calendar</button>
        <button className="btn btn--clear">Find a Tutor</button>
      </div>
      <div className="navbar--right-box">
        <button className="btn btn--clear"><FaUserAlt/></button>
        <button className="btn btn--clear"><FaSignOutAlt/></button>
      </div>
    </div>
  )
}
