import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { useState } from 'react';

export const Dashboard = () => {
  const [role, setRole] = useState('student');

  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <h2>Unread Messages</h2>
      <h2>Upcoming Sessions</h2>
      {role === 'tutor' 
      ? <h2>History</h2> 
      : <h2>Favorite Users</h2>}
    </div>
  )
}
