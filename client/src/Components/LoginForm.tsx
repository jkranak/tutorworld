import { useState } from "react"
import { emptyUserLogin, UserLogin } from "../Interfaces/User"

interface Props {
  setToggle: Function
}

export const LoginForm = ({setToggle}: Props) => {
  const [userLogin, setUserLogin] = useState<UserLogin>(emptyUserLogin);

  function handleChange (event: any) {
    setUserLogin(user => ({...user, [event.target.name]: event.target.value}))
  }
  function handleSubmit () {}
  
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" id="email" name="email" required onChange={handleChange} value={userLogin.email}/>
        <label>Password</label>
        <input type="password" id="password" name="password" required onChange={handleChange} value={userLogin.password}/>
        <button type="submit">Login</button>
      </form>
      <p>If you don't have an account, 
        <button onClick={() => setToggle('register')}>
          Register
        </button>
      </p>
    </div>
  )
}
