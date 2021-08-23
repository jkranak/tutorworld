import {FC, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { getUserHistory } from '../services/apiUser';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { UpcomingSession } from '../components/dashboard/UpcomingSession';
import { History } from '../components/dashboard/History';
import { FavTutors } from '../components/dashboard/FavTutors';
import { Earnings } from '../components/dashboard/Earnings';
import { emptyHistoryComplex } from '../interfaces/Session';
import { RootState } from '../redux/store/store';


export const Dashboard: FC = () => {
  const user = useSelector((state: RootState) => state.authenticate);
  const [historyList, setHistoryList] = useState([emptyHistoryComplex]);

  useEffect(() => {
    getUserHistory().then(res => {
      setHistoryList(res);
    })
  }, [])

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
                  <History historyList={historyList} />
                </div>
              </div>

              <div className="dashboard__content--display--info">
                <h1 className="dashboard__content--display--title">Earnings</h1>
                <div className="dashboard__content--display--bottom--box">
                  <Earnings historyList={historyList}/>
                </div>
              </div>
            </div>
            :
            <div className="dashboard__content--display--bottom">
              <div className="dashboard__content--display--info">
                <h1 className="dashboard__content--display--title">History</h1> 
                <div className="dashboard__content--display--bottom--box">
                <History historyList={historyList} />
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
