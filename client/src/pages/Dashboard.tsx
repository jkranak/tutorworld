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
                <p>message</p>
              </div>
            </div>
            <div className="dashboard__content--display--info">
              <h1 className="dashboard__content--display--title">Upcoming Sessions</h1>
              <div className="dashboard__content--display--top--box">
                  <p>message</p>
              </div>
            </div>
          </div>
          {role === 'tutor' ? 
            <div className="dashboard__content--display--bottom">
              <h1 className="dashboard__content--display--title">History</h1> 
              <h1 className="dashboard__content--display--title">Earnings Owned</h1>
            </div>
            :
            <div className="dashboard__content--display--bottom">
              <h1 className="dashboard__content--display--title">History</h1> 
              <h1 className="dashboard__content--display--title">Favorite Tutors</h1>
            </div>  
          }
        </div>
      </div>
    </div>
  )
}
