import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HistoryComplex, emptyHistoryComplex } from '../../interfaces/Session';
import { getUserHistory } from '../../services/apiUser';
import { HistoryEntry } from './HistoryEntry';

export const History: FC = () => {
  const user = useSelector((state: any) => state.authenticate);
  const [historyList, setHistoryList] = useState([emptyHistoryComplex]);

  useEffect(() => {
    getUserHistory().then(res => {
      setHistoryList(res);
    })
  }, [])
  
  return (
    <div>
      <ol>
        {historyList.map((session: HistoryComplex) => (
          <li key={session.createdAt}><HistoryEntry session={session} user={user}/></li>
        ))}
      </ol>
    </div>
  )
}
