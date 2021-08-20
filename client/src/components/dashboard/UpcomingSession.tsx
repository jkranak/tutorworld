import {useEffect, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { emptySession, Session } from '../../interfaces/Session';
import { getUserSessions } from '../../services/apiUser';
import { SessionEntry } from './SessionEntry';

export const UpcomingSession: FC = () => {
  const user = useSelector((state: any) => state.authenticate);
  const [sessionList, setSessionList] = useState([emptySession]);

  useEffect(() => {
    getUserSessions().then(res => {
      setSessionList(res);
    })
  }, [])
  
  return (
    <div>
      <ol>
      {sessionList.map((session: Session) => (
        <li key={session.createdAt}><SessionEntry session={session} user={user}/></li>
      ))}
      </ol>
    </div>
  )
}
