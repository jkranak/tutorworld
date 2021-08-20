import {FC, useState, useEffect} from 'react';
import { getStudentDetails } from '../../services/apiUser';
import { emptyStudentComplete } from '../../interfaces/Student';
import { ChangePassword } from '../ChangePassword';
import { ProfileStudentEdit } from './ProfileStudentEdit';
import { ProfileStudentView } from './ProfileStudentView';


export const ProfileStudent: FC = () => {
  const [studentDetails, setStudentDetails] = useState(emptyStudentComplete);
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    getStudentDetails().then(res => {
      setStudentDetails(res);
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
    <ProfileStudentEdit studentDetails={studentDetails} setStudentDetails={setStudentDetails} setEditing={setEditing}/>
    {changePassword ? <ChangePassword setChangePassword={setChangePassword}/> : <button onClick={() => setChangePassword(true)} className="btn btn--clear">Change password</button> }
    <button onClick={editClick} className="btn btn--clear">Exit Edit Profile</button>
  </>
  : <>
    <ProfileStudentView studentDetails={studentDetails} />
    <button onClick={editClick} className="btn btn--blue">Edit Profile</button>
  </>}
  
  </>
)
}
