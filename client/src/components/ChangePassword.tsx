import { useState, FormEvent } from 'react'

interface Props {
  setChangePassword: (changePassword: boolean) => void
}

export const ChangePassword = ({setChangePassword}: Props) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="password" id="password" name="password" onChange={handlePasswordChange} value={password.password} placeholder="Password"  />
        <input type="password" id="verify" name="verify" onChange={handlePasswordChange} value={password.verify} placeholder="Verify Password" />
        <button type="submit">Change Password</button>
      </form>
      <button onClick={() => setChangePassword(false)}>Cancel</button>
    {!match && <p>Passwords don't match</p>}
    </div>
  )
}
