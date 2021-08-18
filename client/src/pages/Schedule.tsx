import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { ScheduleSession } from '../components/ScheduleSession';


export const Schedule = () => {

  
  return (
    <div>
      <Navbar />
      <Sidebar />
      <h2>Schedule a Session</h2>
      <ScheduleSession />
    </div>
  )
}
