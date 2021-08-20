import {FC} from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { UpcomingSession } from '../components/dashboard/UpcomingSession';
import { History } from '../components/dashboard/History';
import { FavTutors } from '../components/dashboard/FavTutors';


export const Dashboard: FC = () => {
  const user = useSelector((state: any) => state.authenticate);

  // TO-DO create component for repeated code
  return (
    <div className="dashboard">
      <Navbar/>
      <div className="dashboard__content">
        <Sidebar/>
        <main className="dashboard__content--display">
          <div className="dashboard__content--display--top">
            <div className="dashboard__content--display--info">
              <h1 className="dashboard__content--display--title">Unread Messages</h1>
              <div className="dashboard__content--display--top--box">
                <p>messages</p>
              </div>
            </div>
            <div className="dashboard__content--display--info">
              <h1 className="dashboard__content--display--title">Upcoming Sessions</h1>
              <div className="dashboard__content--display--top--box">
                  <UpcomingSession />
              </div>
            </div>
          </div>
          {user.role === 'tutor' ? 
            <div className="dashboard__content--display--bottom">
              <div className="dashboard__content--display--info">
                <h1 className="dashboard__content--display--title">History</h1>
                <div className="dashboard__content--display--top--box">
                  <History />
                </div>
              </div>

              <div className="dashboard__content--display--info">
                <h1 className="dashboard__content--display--title">Earnings Owned</h1>
                <div className="dashboard__content--display--bottom--box">
                  <p>earnings</p>
                </div>
              </div>
            </div>
            :
            <div className="dashboard__content--display--bottom">
              <div className="dashboard__content--display--info">
                <h1 className="dashboard__content--display--title">History</h1> 
                <div className="dashboard__content--display--bottom--box">
                </div>
              </div>
              <div className="dashboard__content--display--info">
                <h1 className="dashboard__content--display--title">Favorite Tutors</h1>
                <div className="dashboard__content--display--bottom--box">
                  <FavTutors />
                </div>
              </div>
            </div>  
          }
        </main>
      </div>
    </div>
  )
}
