import {useEffect, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { emptySessionComplex, SessionComplex } from '../../interfaces/Session';
import { getUserSessions } from '../../services/apiUser';
import { SessionEntry } from './SessionEntry';
import { RootState } from '../../redux/store/store';

export const UpcomingSession: FC = () => {
  const user = useSelector((state: RootState) => state.authenticate);
  const [sessionList, setSessionList] = useState([emptySessionComplex]);

  useEffect(() => {
    getUserSessions().then(res => {
      setSessionList(res);
    })
  }, [])
  
  return (
    <div>
      <ol>
      {sessionList.map((session: SessionComplex) => (
        <li key={session.createdAt}><SessionEntry session={session} user={user}/></li>
      ))}
      </ol>
    </div>
  )
}
