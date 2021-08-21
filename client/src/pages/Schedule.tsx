import {FC} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { ScheduleSession } from '../components/ScheduleSession';

export const Schedule: FC = () => {
  const user = useSelector((state: any )=> state.currentTutorInfo);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <h2>Schedule a Session</h2>
      {user ? <ScheduleSession /> : <Link to={"/dashboard"}>Back</Link>}
    </div>
  )
}
