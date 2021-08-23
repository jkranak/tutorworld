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
  
  return (
    <div>
      <Navbar />
      <Sidebar />
      {window.history.state 
        ? user.role === 'tutor' 
          ? <SessionDetailTutor sessionInfo={window.history.state.state}/>
          : <SessionDetailStudent sessionInfo={window.history.state.state} />
        : <Link to={"/dashboard"}>Back</Link>}
    </div>
  )
}
