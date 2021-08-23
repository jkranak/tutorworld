import { HistoryComplex } from '../../interfaces/Session'

interface Props {
  session: HistoryComplex
}
export default function EarningsEntry({ session }: Props) {
  return (
    <div className="dashboard__content--display--session">
      <div className="dashboard__content--display--session-details">
        <div className="dashboard__content--display--session--left-box">
          <h2>${session.cost} - {session.date}</h2>
        </div>
      </div>
    </div>
  )
}
