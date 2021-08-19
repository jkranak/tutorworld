import { useEffect, useState } from 'react';

import { getTutorDetails } from '../services/apiUser';
import { ChangePassword } from '../components/ChangePassword';
import {ProfileTutorView} from './ProfileTutorView';
import {ProfileTutorEdit} from './ProfileTutorEdit';
import {emptyTutorWithAvailability} from '../interfaces/Tutor';


export const ProfileTutor = () => {
  const [tutorDetails, setTutorDetails] = useState(emptyTutorWithAvailability);
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  

  useEffect(() => {
      getTutorDetails().then(res => {
        setTutorDetails(res);
      })
  }, []);

  const editClick = () => {
    setEditing(!editing);
    setChangePassword(false);
  }
  
  return (
    <>
    {editing 
    ? <>
      <ProfileTutorEdit tutorDetails={tutorDetails} setTutorDetails={setTutorDetails} setEditing={setEditing}/>
      <button onClick={editClick} className="btn btn--clear">Exit Edit Profile</button>
    </>
    : <>
      <ProfileTutorView tutorDetails={tutorDetails} />
      <button onClick={editClick} className="btn btn--blue">Edit Profile</button>
    </>}
    {editing && changePassword ? ChangePassword: <button onClick={() => setChangePassword(true)} className="btn btn--clear">Change password</button> }
    </>
  )
}
