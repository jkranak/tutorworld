import { useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { emptyUser, User } from "../Interfaces/User"

interface Props {
  setToggle: Function
}

export const RegisterForm = ({setToggle}: Props) => {
  const [newUser, setNewUser] = useState<User>(emptyUser)

  function handleChange (event: any) {
    setNewUser(user => ({...user, [event.target.name]: event.target.value}))
  }
  function handleSubmit () {}
  
  return (
    <div className="form register-form">
      <div className="form--title">
        <h1 className="before-icon">Register</h1>
        <FaSignInAlt className="fa-icon form--icon"/>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" id="fname" name="firstName" required onChange={handleChange} value={newUser.firstName}
        className="text-input text-input--blue"
        placeholder="First Name*"
        />
        <input type="text" id="lname" name="lastName" required onChange={handleChange} value={newUser.lastName}
        className="text-input text-input--blue"
        placeholder="Last Name*"
        />
        <input type="text" id="email" name="email" required onChange={handleChange} value={newUser.email}
        className="text-input text-input--blue"
        placeholder="E-mail address*"
        />
        <input type="password" id="password" name="password" required onChange={handleChange} value={newUser.password}
        className="text-input text-input--blue"
        placeholder="Password*"
        />
        <input type="password" id="passwordConfirm" name="passwordConfirm" required onChange={handleChange} value={newUser.passwordConfirm}
        className="text-input text-input--blue"
        placeholder="Confirm Password*"
        />
        <button type="submit" className="btn btn--beige form--btn">REGISTER</button>
      </form>
      <div className="form--toggle">
        <span>Already have an account?</span>
        <button onClick={() => setToggle('login')} className="form--toggle-btn">
          Login
        </button>
      </div>
    </div>
  )
}
