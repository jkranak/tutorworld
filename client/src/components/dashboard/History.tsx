import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HistoryI, emptyHistory } from '../../interfaces/Session';
import { getUserHistory } from '../../services/apiUser';
import { HistoryEntry } from './HistoryEntry';

export const History: FC = () => {
  const user = useSelector((state: any) => state.authenticate);
  const [historyList, setHistoryList] = useState([emptyHistory]);

  useEffect(() => {
    getUserHistory().then(res => {
      setHistoryList(res);
    })
  }, [])
  
  return (
    <div className="dashboard__content--display--info">
      <h1 className="dashboard__content--display--title">History</h1>
      <div className="dashboard__content--display--sessions">
        {historyList.map((session: HistoryI) => (
          <HistoryEntry session={session} user={user} key={session.createdAt}/>
        ))}
      </div>
    </div>
  )
}
