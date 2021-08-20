import { useState, FormEvent, FC } from 'react'

interface Props {
  setChangePassword: (changePassword: boolean) => void
}

export const ChangePassword: FC<Props> = ({setChangePassword}: Props) => {
  // TO-DO we should probably have the user type their current password to verify it before changing it
  const [password, setPassword] = useState({password: '', verify: ''});
  const [match, setMatch] = useState(true);

  const handlePasswordChange = (event: {target: {name: string, value: any}}) => {
    setPassword(current => ({...current, [event.target.name]: event.target.value}))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (password.password === password.verify) setChangePassword(false);
    else setMatch(false);
  }

  return (
    <div className="form edit-form" >
      <form onSubmit={handleSubmit}>
        <input type="password" id="password" name="password" onChange={handlePasswordChange} value={password.password} placeholder="Password"  
        className="text-input text-input--blue"
        />
        <input type="password" id="verify" name="verify" onChange={handlePasswordChange} value={password.verify} placeholder="Verify Password" 
        className="text-input text-input--blue"
        />
        <button type="submit" className="btn btn--blue form--btn">Change Password</button>
      </form>
      <button onClick={() => setChangePassword(false)} className="btn btn--clear form--btn">Cancel Password Change</button>
    {!match && <p>Passwords don't match</p>}
    </div>
  )
}
