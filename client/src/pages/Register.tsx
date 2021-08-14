import { useState } from 'react'
import {User, emptyUser } from '../interfaces/User'

interface Props {
  
}

export const Register = (props: Props) => {
  const [newUser, setNewUser] = useState(emptyUser)

  function handleChange (event: any) {
    setNewUser(user => ({...user, [event.target.name]: event.target.value}))
  }
  function handleSubmit () {}
  const login = '/'

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>First name</label>
        <input type="text" id="fname" name="firstName" required onChange={handleChange} value={newUser.firstName}/>
        <label>Last name</label>
        <input type="text" id="lname" name="lastName" required onChange={handleChange} value={newUser.lastName}/>
        <label>Email</label>
        <input type="text" id="email" name="email" required onChange={handleChange} value={newUser.email}/>
        <label>Password</label>
        <input type="password" id="password" name="password" required onChange={handleChange} value={newUser.password}/>
        <label>Confirm Password</label>
        <input type="password" id="passwordConfirm" name="passwordConfirm" required onChange={handleChange} value={newUser.passwordConfirm}/>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? Login <a href={login}>here</a></p>
    </div>
  )
}
