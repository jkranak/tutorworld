import {FC} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { ScheduleSession } from '../components/ScheduleSession';

export const Schedule: FC = () => {
  const user = useSelector((state: any )=> state.currentTutorInfo);

  return (
    <div className="schedule">
      <Navbar />
      <div className="schedule__content">
        <Sidebar />
        <div className="schedule__content--right">
          <h2 className="schedule__content--title">Schedule a Session</h2>
          {user ? <ScheduleSession /> : <Link to={"/dashboard"} className="btn btn--blue">Back</Link>}
        </div>
      </div>    
    </div>
  )
}
