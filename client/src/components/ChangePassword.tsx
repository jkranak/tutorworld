import { useState, FormEvent, FC } from 'react';
import {updatePassword} from '../services/apiUser';

interface Props {
  setChangePassword: (changePassword: boolean) => void
  role: string
}

export const ChangePassword: FC<Props> = ({setChangePassword, role}: Props) => {
  // TO-DO we should probably have the user type their current password to verify it before changing it
  const [password, setPassword] = useState({oldPassword: '', password: '', verify: ''});
  const [match, setMatch] = useState(true);
  const [noChange, setNoChange] = useState(false);
  const [passwordFail, setPasswordFail] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordChange = (event: {target: {name: string, value: any}}) => {
    setPassword(current => ({...current, [event.target.name]: event.target.value}))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMatch(true);
    setNoChange(false);
    setPasswordFail(false)
    setPasswordError(false);
    if (password.password !== password.verify) setMatch(false);
    else if (password.password === password.oldPassword) setNoChange(true);
    else {
      const res = await updatePassword(role, password.oldPassword, password.password);
      console.log(res)
      if (res.status === 204) setChangePassword(false);
      if (res.status === 404) setPasswordFail(true);
      if (res.status === 500) setPasswordError(true);
      };
  }

  return (
    <div className="form edit-form" >
      <form onSubmit={handleSubmit}>
      <input type="password" id="oldPassword" name="oldPassword" onChange={handlePasswordChange} value={password.oldPassword} placeholder="Old Password"  
        className="text-input text-input--blue"
        />
        <input type="password" id="password" name="password" onChange={handlePasswordChange} value={password.password} placeholder="New Password"  
        className="text-input text-input--blue"
        />
        <input type="password" id="verify" name="verify" onChange={handlePasswordChange} value={password.verify} placeholder="Verify Password" 
        className="text-input text-input--blue"
        />
        <button type="submit" className="btn btn--blue form--btn">Change Password</button>
      </form>
      <button onClick={() => setChangePassword(false)} className="btn btn--clear form--btn">Cancel Password Change</button>
    {!match && <p>Passwords don't match</p>}
    {passwordFail && <p>Wrong password</p>}
    {passwordError && <p>Server Error</p>}
    {noChange && <p>New Passord is the same as Old Password</p>}
    </div>
  )
}
