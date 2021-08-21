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
    <div className="dashboard__content--display--info">
      <h1 className="dashboard__content--display--title">Upcoming Sessions</h1>
      <div>
      {sessionList.map((session: Session) => (
        <div key={session.createdAt}><SessionEntry session={session} user={user}/></div>
      ))}
      </div>
    </div>
  )
}
