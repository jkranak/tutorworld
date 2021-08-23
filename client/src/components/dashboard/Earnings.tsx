import {FC} from 'react';
import {HistoryComplex} from '../../interfaces/Session';

interface Props {
  historyList: HistoryComplex[]
}

export const Earnings: FC<Props> = ({historyList}: Props) => {
const total = historyList.reduce((a, b,) => a + b.cost, 0);

  return (
    <div className="dashboard__content--display--info">
      <h1 className="dashboard__content--display--title">Earnings</h1>
      <div className="dashboard__content--display--sessions">
        {historyList.map((session: HistoryComplex) => (
          // <HistoryEntry session={session} user={user} key={session.createdAt}/>
          <p key={session.id}>${session.cost} - {session.date}</p>
        ))}
        <p>Total: ${total}</p>
      </div>
    </div>
  )
}
