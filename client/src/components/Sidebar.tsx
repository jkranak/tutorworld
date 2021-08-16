import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [role, setRole] = useState('student');

  return (
    <div>
      <Link to={'/profile'}>Profile</Link>
      {role === 'tutor' && <button>Availability</button>}
      <button>Conversations</button>
      <button>Calendar</button>
    </div>
  )
}
