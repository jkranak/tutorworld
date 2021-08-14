import {useState} from 'react'
import {UserLogin, emptyUserLogin} from '../Interfaces/User';

interface Props {
  
}

export const Login = (props: Props) => {
  const [userLogin, setUserLogin] = useState(emptyUserLogin)

  function handleChange (event: any) {
    setUserLogin(user => ({...user, [event.target.name]: event.target.value}))
  }
  function handleSubmit () {}
  const register = '/'

return (
<div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" id="email" name="email" required onChange={handleChange} value={userLogin.email}/>
        <label>Password</label>
        <input type="password" id="password" name="password" required onChange={handleChange} value={userLogin.password}/>
        <button type="submit">Login</button>
      </form>
      <p>If you don't have an account, <a href={register}>Register</a></p>
    </div>
  )
}
