import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/tutor_world.svg';

export const Logo: FC = () => {
  // if authenticated the logo link will be dashboard
  // if not the link will be to landing page
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  return (
    <Link to={isAuthenticated ? "/dashboard" : "/"} className="logo-box">
      <img src={logo} alt="tutor world logo" className="logo-box__image"/>
    </Link>
  )
}