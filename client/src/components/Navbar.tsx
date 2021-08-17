import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa'

export const Navbar = () => {
  const [role, setRole] = useState('student');
  const history = useHistory();
  
  const handleLogout = () => {
    localStorage.removeItem('x-auth-token');
    history.push('/');
  }

  return (
    <div className="navbar">
      <div className="navbar--left-box">
        <Link to='/dashboard' className="btn btn--clear">Dashboard</Link>
        <button className="btn btn--clear">Conversations</button>
        <button className="btn btn--clear">Calendar</button>
        {role === 'student' && <Link to={'/search'} className="btn btn--clear">Find a Tutor</Link>}
      </div>
      <div className="navbar--right-box">
        <Link to={'/profile'} className="btn btn--clear"><FaUserAlt/></Link>
        <button className="btn btn--clear" onClick={handleLogout} ><FaSignOutAlt/></button>
      </div>
    </div>
  )
}
