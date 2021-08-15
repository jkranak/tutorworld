import { useState } from 'react';

export const Sidebar = () => {
  const [role, setRole] = useState('student');

  return (
    <div>
      <button>Profile</button>
      {role === 'tutor' && <button>Availability</button>}
      <button>Conversations</button>
      <button>Calendar</button>
    </div>
  )
}
