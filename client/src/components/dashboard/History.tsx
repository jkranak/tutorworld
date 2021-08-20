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
    <div>
      <ol>
        {historyList.map((session: HistoryI) => (
          <li key={session.createdAt}><HistoryEntry session={session} user={user}/></li>
        ))}
      </ol>
    </div>
  )
}
