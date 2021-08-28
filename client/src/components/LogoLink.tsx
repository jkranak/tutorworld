import { useState, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/tutor_world.svg';

export default function LogoLink(): ReactElement {
  const [isAuthenticated] = useState<boolean>(false)
  return (
    <Link to={isAuthenticated ? "/dashboard" : "/"} className="logo-box">
      <img src={logo} alt="tutor world logo" className="logo-box__image"/>
    </Link>
  )
}