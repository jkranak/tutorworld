import {FC} from 'react';
import {HistoryComplex} from '../../interfaces/Session';
import EarningsEntry from './EarningsEntry';

interface Props {
  historyList: HistoryComplex[]
}

export const Earnings: FC<Props> = ({historyList}: Props) => {
const total = historyList.reduce((a, b,) => a + b.cost, 0);

  return (
    <div className="dashboard__content--display--info">
      <h1 className="dashboard__content--display--title">Earnings</h1>
      <div className="dashboard__content--display--sessions earnings">
        {historyList.map((session: HistoryComplex) => (
          <EarningsEntry session={session} key={session.id}/>
        ))}
        <h2 className="earnings__total">Total: ${total}</h2>
      </div>
    </div>
  )
}
