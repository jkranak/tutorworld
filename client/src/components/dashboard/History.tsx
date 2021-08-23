import { FC } from 'react';
import { useSelector } from 'react-redux';
import { HistoryComplex } from '../../interfaces/Session';
import { HistoryEntry } from './HistoryEntry';
import { RootState } from '../../redux/store/store';

interface Props {
  historyList: HistoryComplex[]
}

export const History: FC<Props> = ({historyList}: Props) => {
  const user = useSelector((state: RootState) => state.authenticate);
  
  return (
    <div className="dashboard__content--display--info">
      <h1 className="dashboard__content--display--title">History</h1>
      <div className="dashboard__content--display--sessions">
        {historyList.map((session: HistoryComplex) => (
          <HistoryEntry session={session} user={user} key={session.createdAt}/>
        ))}
      </div>
    </div>
  )
}
