import { useEffect, useState, FC } from 'react';
import { getTutorDetails } from '../../services/apiUser';
import { ChangePassword } from '../ChangePassword';
import {ProfileTutorView} from './ProfileTutorView';
import {ProfileTutorEdit} from './ProfileTutorEdit';
import {emptyTutorWithAvailability} from '../../interfaces/Tutor';

interface Props {
  id: number
}

export const ProfileTutor: FC<Props> = ({id}: Props) => {
  const [tutorDetails, setTutorDetails] = useState(emptyTutorWithAvailability);
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  

  useEffect(() => {
      getTutorDetails(id).then(res => {
        setTutorDetails(res);
      })
  }, []);

  const editClick = () => {
    setEditing(!editing);
  }
  
  
  return (
    <>
    {editing 
    ? <>
      <ProfileTutorEdit tutorDetails={tutorDetails} setTutorDetails={setTutorDetails} setEditing={setEditing}/>
      {changePassword ?
        <ChangePassword setChangePassword={setChangePassword} /> 
        : <button onClick={() => setChangePassword(true)} className="btn btn--clear">Change password</button>
      }
      <button onClick={editClick} className="btn btn--clear">Exit Edit Profile</button>
    </>
    : <>
      <ProfileTutorView tutorDetails={tutorDetails} />
      <button onClick={editClick} className="btn btn--blue">Edit Profile</button>
    </>}
    
    </>
  )
}
