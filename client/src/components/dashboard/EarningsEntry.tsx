import moment from 'moment'
import { HistoryComplex } from '../../interfaces/Session'

interface Props {
  session: HistoryComplex
}
export default function EarningsEntry({ session }: Props) {
  return (
    <div className="dashboard__content--display--session">
      <div className="dashboard__content--display--session-details">
        <div className="dashboard__content--display--session--left-box earnings">
          <h2 className="earnings-date">Date: {moment(session.date).format('MMMM DD, YYYY')}</h2>
          <h2 className="earnings-cost">Earning: ${session.cost}</h2>
        </div>
      </div>
    </div>
  )
}
