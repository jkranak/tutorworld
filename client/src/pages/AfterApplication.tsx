import mailIcon from '../assets/email.svg'

interface Props {
  
}

export const AfterApplication = (props: Props) => {
  
  return (
    <div>
     <h2>Application sent</h2>
     <h3>We are reviewing your application. We will email you soon.</h3>
     <img src={mailIcon} alt="mail sent" height="80px"/>
     <button>Go to home</button>
    </div>
  )
}
