import {FC} from 'react'
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { SessionDetailStudent } from '../components/SessionDetailStudent';
import { SessionDetailTutor } from '../components/SessionDetailTutor';
import {RootState} from '../redux/store/store';




export const SessionDetail: FC = () => {
  const user = useSelector((state: RootState) => state.authenticate);
  // const sessionInfo: SessionDetailI = window.history.state.state;
  
  return (
    <div>
      <Navbar />
      <Sidebar />
      <p>Details</p>
      
      {window.history.state 
        ? user.role === 'tutor' 
          ? <SessionDetailTutor sessionInfo={window.history.state.state}/>
          : <SessionDetailStudent sessionInfo={window.history.state.state} />
        : <Link to={"/dashboard"}>Back</Link>}
    </div>
  )
}

// interface Props {
//   sessionInfo: {
//     date: string
//     time: string
//     name: string
//     rating: number
//     review: string
//   }
// }

//History: HistoryComplex
//Session: SessionComplex
//userrole

//upcoming: role, type (history or upcoming), cost, sessionContext, date, time, otherFirstName, otherLastName, otherImageUrl
//history: same plus: starRating, review
