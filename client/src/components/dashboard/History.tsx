import { FC } from 'react';
import { useSelector } from 'react-redux';
import { HistoryComplex } from '../../interfaces/Session';
import { HistoryEntry } from './HistoryEntry';

interface Props {
  historyList: HistoryComplex[]
}

export const History: FC<Props> = ({historyList}: Props) => {
  const user = useSelector((state: any) => state.authenticate);
  
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
