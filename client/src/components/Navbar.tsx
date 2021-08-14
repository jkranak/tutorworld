import profileIcon from '../assets/profile.svg';
import signOutIcon from '../assets/signout.png';
import '../Css/Navbar.css';

interface Props {
  
}

export const Navbar = (props: Props) => {
  return (
    <div className="navbar">
      <button className="navbar__button">Dashboard</button>
      <button className="navbar__button">Conversations</button>
      <button className="navbar__button">Calendar</button>
      <button className="navbar__button">Find a Tutor</button>
      <button className="navbar__button"><img src={profileIcon} height="20px" alt="profile"></img></button>
      <button className="navbar__button"><img src={signOutIcon} height="20px" alt="profile"></img></button>
    </div>
  )
}
