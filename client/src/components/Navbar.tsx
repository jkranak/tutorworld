import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa'

export const Navbar = () => {
  const [role, setRole] = useState('student');

  return (
    <div className="navbar">
      <Link to='/dashboard'>Dashboard</Link>
      <button className="navbar__button">Conversations</button>
      <button className="navbar__button">Calendar</button>
      {role === 'student' && <Link to={'/search'}>Find a tutor</Link>}
      <Link to={'/profile'}><FaUserAlt/></Link>
      <button className="navbar__button"><FaSignOutAlt/></button>
    </div>
  )
}
