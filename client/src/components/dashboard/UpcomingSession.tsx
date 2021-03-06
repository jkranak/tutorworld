import {useEffect, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { emptySessionComplex, SessionComplex } from '../../interfaces/Session';
import { getUserSessions } from '../../services/apiUser';
import { SessionEntry } from './SessionEntry';
import { RootState } from '../../redux/store/store';
import { UserAuth } from '../../interfaces/User';

export const UpcomingSession: FC = () => {
  const user: UserAuth = useSelector((state: RootState) => state.authenticate);
  const [sessionList, setSessionList] = useState([emptySessionComplex]);

  useEffect(() => {
    getUserSessions().then(res => {
      setSessionList(res);
    })
  }, [])
  
  return (
    <div className="dashboard__content--display--info">
      <h1 className="dashboard__content--display--title">Upcoming Sessions <div className="dashboard__content--display--title--number">{sessionList.length}</div></h1>
      <div className="dashboard__content--display--sessions" >
      {sessionList.map((session: SessionComplex) => (
        <SessionEntry session={session} user={user} key={session.createdAt}/>
      ))}
      </div>
    </div>
  )
}
