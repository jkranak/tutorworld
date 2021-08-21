import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import {ViewProfileComponent} from '../components/profile/ViewProfileComponent';

export const ViewProfile = () => {
  const tutorDetails = useSelector((state: any )=> state.currentTutorInfo);

  return (
    <>
    <Navbar />
    {tutorDetails ? <ViewProfileComponent tutorDetails={tutorDetails}/> : <Link to={"/dashboard"}>Back</Link>}
    </>
  )
}
