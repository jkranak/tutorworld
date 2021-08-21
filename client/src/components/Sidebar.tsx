import { FC } from 'react';
import { FaCalendar, FaComment, FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Sidebar: FC = () => {
  const user = useSelector((state: any) => state.authenticate)

  return (
    <div className="sidebar">
      <Link to={'/profile'} className="btn btn--clear"><FaUserAlt className="sidebar__icon"/> Profile</Link>
      {user.role === 'tutor' && <button className="btn btn--clear">Availability</button>}
      <Link to={'/messages'} className="btn btn--clear"><FaComment className="sidebar__icon"/>Conversations</Link>
      <button className="btn btn--clear" ><FaCalendar className="sidebar__icon"/>Calendar</button>
    </div>
  )
}
