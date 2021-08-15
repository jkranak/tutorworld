import { useState } from "react"
import { FaSignInAlt } from "react-icons/fa";
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
    <div className="form login-form">
      <div className="form--title">
        <h1 className="before-icon">Sign In</h1>
        <FaSignInAlt className="fa-icon form--icon"/>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" id="email" name="email" required onChange={handleChange} value={userLogin.email} placeholder="E-mail address*" className="text-input text-input--blue"/>
        <input type="password" id="password" name="password" placeholder="Password*" required onChange={handleChange} value={userLogin.password}
        className="text-input text-input--blue"
        />
        <button className="btn btn--beige form--btn" type="submit">SIGN IN</button>
      </form>
      <div className="form--toggle">
        <span>Don't have an account?</span>
        <button onClick={() => setToggle('register')} className="form--toggle-btn">
          Register
        </button>
      </div>
    </div>
  )
}
