import { useState } from 'react'
import { LoginForm } from '../components/LoginForm'
import Logo from '../components/Logo'
import { RegisterForm } from '../components/RegisterForm'

export const Login = () => {
  const [toggle, setToggle] = useState<string>('login')
  return (
    <div className="login">
      <header>
        <Logo />
      </header>
      {toggle === 'login' && <LoginForm setToggle={setToggle}/>}
      {toggle === 'register' && <RegisterForm setToggle={setToggle}/>}
    </div>
  )
}