import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store/store';

export const Sidebar: FC = () => {
  const user = useSelector((state: RootState) => state.authenticate)

  return (
    <div className="sidebar">
      <Link to={'/profile'} className="btn btn--clear">Profile</Link>
      {user.role === 'tutor' && <button className="btn btn--clear">Availability</button>}
      <Link to={'/messages'} className="btn btn--clear">Conversations</Link>
      <Link to={"/calendar"} className="btn btn--clear">Calendar</Link>
    </div>
  )
}
