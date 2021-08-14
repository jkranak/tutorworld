interface Props {
  setToggle: Function
}

export const RegisterForm = ({setToggle}: Props) => {
  return (
    <div className="register-form">
      REGISTER FORM
      <p>Already an user? 
        <button onClick={() => setToggle('login')}>
          Login
        </button>
      </p>
    </div>
  )
}
