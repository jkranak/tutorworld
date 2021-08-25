import { useState, FC } from 'react'
import { LoginForm } from '../components/LoginForm'
import LogoLink from '../components/LogoLink'
import { RegisterForm } from '../components/RegisterForm'

export const Login: FC = () => {
  const [toggle, setToggle] = useState<string>(window.history.state.state.toggle)
  return (
    <div className="login">
      <header>
        <LogoLink />
      </header>
      {toggle === 'login' && <LoginForm setToggle={setToggle}/>}
      {toggle === 'register' && <RegisterForm setToggle={setToggle}/>}
    </div>
  )
}
