import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Sidebar: FC = () => {
  const user = useSelector((state: any) => state.authenticate)

  return (
    <div className="sidebar">
      <Link to={'/profile'} className="btn btn--clear">Profile</Link>
      {user.role === 'tutor' && <button className="btn btn--clear">Availability</button>}
      <button className="btn btn--clear">Conversations</button>
      <button className="btn btn--clear">Calendar</button>
    </div>
  )
}
