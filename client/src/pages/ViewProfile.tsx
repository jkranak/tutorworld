import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ViewProfileComponent } from '../components/profile/ViewProfileComponent';
import { RootState } from '../redux/store/store';

export const ViewProfile = () => {
  const tutorDetails = useSelector((state: RootState )=> state.currentTutorInfo);

  return (
    <>
    <Navbar />
    {tutorDetails ? <ViewProfileComponent tutorDetails={tutorDetails}/> : <Link to={"/dashboard"}>Back</Link>}

    </>
  )
}
