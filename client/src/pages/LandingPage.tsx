import { useState } from "react"
import { Link } from "react-router-dom";
import { About } from "../components/About";
import { LandingBody } from "../components/LandingBody";

interface Props {
  
}

export const LandingPage = (props: Props) => {

  const [toggle, setToggle] = useState<string>('home');

  return (
    <div className="landing">

      <header className="landing__header">
        {toggle === 'home' && <button onClick={() => setToggle('about')}>About Us</button> }
        {toggle === 'about' && <button onClick={() => setToggle('home')}>Home</button>}
        
        <Link to={'/application'}>Apply to be a Tutor</Link>
        <Link to={'/login'}>Login/Register</Link>
      </header>

      {
        toggle === 'home' && <LandingBody/>
      }
      {
        toggle === 'about' && <About />
      }
    </div>
  )
}
