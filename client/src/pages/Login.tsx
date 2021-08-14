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
}