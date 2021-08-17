import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { useState } from 'react';

export const Dashboard = () => {
  const [role, setRole] = useState('student');
  
  return (
    <div className="dashboard">
      <Navbar/>
      <div className="dashboard__content">
        <Sidebar/>
        <div className="dashboard__content--display">
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
                  <p>sessions</p>
              </div>
            </div>
          </div>
          {role === 'tutor' ? 
            <div className="dashboard__content--display--bottom">
              <div className="dashboard__content--display--info">
                <h1 className="dashboard__content--display--title">History</h1>
                <div className="dashboard__content--display--top--box">
                  <p>previous sessions</p>
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
                  <p>previous sessions</p>
                </div>
              </div>
              <div className="dashboard__content--display--info">
                <h1 className="dashboard__content--display--title">Favorite Tutors</h1>
                <div className="dashboard__content--display--bottom--box">
                  <p>tutors</p>
                </div>
              </div>
            </div>  
          }
        </div>
      </div>
    </div>
  )
}
