import {FC} from 'react';
import {HistoryComplex} from '../../interfaces/Session';

interface Props {
  historyList: HistoryComplex[]
}

export const Earnings: FC<Props> = ({historyList}: Props) => {
const total = historyList.reduce((a, b,) => a + b.cost, 0);

  return (
    <div>
      {historyList.map((session: HistoryComplex) => (
        <p key={session.id}>${session.cost} - {session.date}</p>
      ))}
      <p>Total: ${total}</p>
    </div>
  )
}
