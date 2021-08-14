import {useState} from 'react'
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
}