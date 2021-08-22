import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { ScheduleSession } from '../components/ScheduleSession';


export const Schedule = () => {
  return (
    <div className="schedule">
      <Navbar />
      <div className="schedule__content">
        <Sidebar />
        <div className="schedule__content--right">
          <h2 className="schedule__content--title">Schedule a Session</h2>
          <ScheduleSession />
        </div>
      </div>
    </div>
  )
}
