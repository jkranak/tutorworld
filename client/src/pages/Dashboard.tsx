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
import { UserAuth } from '../interfaces/User';


export const Dashboard: FC = () => {
  const user: UserAuth = useSelector((state: RootState) => state.authenticate);
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
            <UpcomingSession />
            <History historyList={historyList}/>
          {user.role === 'tutor' ? 
            <Earnings historyList={historyList}/>
            :
            <FavTutors />
          }
        </main>
      </div>
    </div>
  )
}
