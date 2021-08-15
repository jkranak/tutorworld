<<<<<<< HEAD
import { useState } from 'react'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'

export const Login = () => {
  const [toggle, setToggle] = useState<string>('login')
  return (
    <div className="login">
      {toggle === 'login' && <LoginForm setToggle={setToggle}/>}
      {toggle === 'register' && <RegisterForm setToggle={setToggle}/>}
    </div>
  )
=======
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export const Login = () => {
  const [toggle, setToggle] = useState<string>('login');

  return (
    <div className="login">
      <Link to={'/'} className="btn btn--blue">Home</Link>
      {toggle === 'login' ? <LoginForm setToggle={setToggle} /> :
      <RegisterForm setToggle={setToggle}/>}
    </div>
  )
>>>>>>> 565702de4496a7b3ca7dc8cf7d613e801f25220d
}