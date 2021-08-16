import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [role, setRole] = useState('student');

  return (
    <div className="sidebar">
      <Link to={'/profile'} className="btn btn--clear">Profile</Link>
      {role === 'tutor' && <button className="btn btn--clear">Availability</button>}
      <button className="btn btn--clear">Conversations</button>
      <button className="btn btn--clear">Calendar</button>
    </div>
  )
}
