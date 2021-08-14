import React from 'react'
import profileIcon from '../Assets/profile.svg'
import './Navbar.css';

interface Props {
  
}

export const Navbar = (props: Props) => {
  return (
    <div id="navbar">
      <button className="dashbuttons">Dashboard</button>
      <button className="dashbuttons">Conversations</button>
      <button className="dashbuttons">Calendar</button>
      <button className="dashbuttons">Find a Tutor</button>
      <button className="dashbuttons"><img src={profileIcon} height="20px" alt="profile"></img></button>
      
    </div>
  )
}
