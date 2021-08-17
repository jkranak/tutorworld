import {FC} from 'react';
import { useHistory } from 'react-router-dom';
import mailIcon from '../assets/email.svg'

export const AfterApplication: FC = () => {
  const history = useHistory();

  setTimeout(() => {
    history.push('/')
  }, 5000)

  return (
    <div className="application__after">
     <h1 className="application__after--title">Application sent</h1>
     <p className="application__after--description">We are reviewing your application.</p>
     <p className="application__after--description">We will email you soon.
     </p>
     <div className="application__after--image-box">
      <img src={mailIcon} alt="mail sent" height="80px"/>
     </div>
    </div>
  )
}
