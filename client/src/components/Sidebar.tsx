import { FC } from 'react';
import { FaAlignJustify, FaCalendar, FaClock, FaComment, FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserAuth } from '../interfaces/User';
import { RootState } from '../redux/store/store';

export const Sidebar: FC = () => {
  const user: UserAuth = useSelector((state: RootState) => state.authenticate)

  return (
    <div className="sidebar">
      <Link to={'/dashboard'} className="btn btn--clear"><FaAlignJustify className="sidebar__icon"/>Dashboard</Link>
      <Link to={'/profile'} className="btn btn--clear"><FaUserAlt className="sidebar__icon"/>Profile</Link>
      {user.role === 'tutor' && <button className="btn btn--clear"><FaClock className="sidebar__icon"/>Availability</button>}
      <Link to={'/messages'} className="btn btn--clear"><FaComment className="sidebar__icon"/>Messages</Link>
      <Link to={"/calendar"} className="btn btn--clear" ><FaCalendar className="sidebar__icon"/>Calendar</Link>
    </div>
  )
}
