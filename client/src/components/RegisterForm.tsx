import { FormEvent, useState, FC } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emptyUser, User } from '../interfaces/User';
import { authenticate } from '../redux/actions/authenticate';
import { createUser } from '../services/apiUser';

interface Props {
  setToggle: Function
}

export const RegisterForm: FC<Props> = ({setToggle}: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState<User>(emptyUser)

  const handleChange =  (event: {target: {name: string, value: string}}) => {
    setNewUser(user => ({...user, [event.target.name]: event.target.value}))
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = newUser;
    if (password === confirmPassword) {
      const res = await createUser({ firstName, lastName, email, password, confirmPassword })
      if (res.error) {
        alert(`${res.message}`)
        setNewUser(emptyUser);
      } else {
        const { token, user } = res;
        localStorage.setItem('x-auth-token', token);
        dispatch(authenticate(user));
        history.push('/dashboard');
      }
    } else alert(`Passwords do not match, try again.`);
  }
  
  return (
    <div className="form register-form">
      <div className="form--title">
        <h1 className="before-icon">Register as Student</h1>
        <FaSignInAlt className="fa-icon form--icon"/>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" id="firstname" name="firstName" required onChange={handleChange} value={newUser.firstName}
        className="text-input text-input--blue"
        placeholder="First Name*"
        />
        <input type="text" id="lastname" name="lastName" required onChange={handleChange} value={newUser.lastName}
        className="text-input text-input--blue"
        placeholder="Last Name*"
        />
        <input type="email" id="email" name="email" required onChange={handleChange} value={newUser.email}
        className="text-input text-input--blue"
        placeholder="E-mail address*"
        />
        <input type="password" id="password" name="password" required onChange={handleChange} value={newUser.password}
        className="text-input text-input--blue"
        placeholder="Password*"
        />
        <input type="password" id="confirmPassword" name="confirmPassword" required onChange={handleChange} value={newUser.confirmPassword}
        className="text-input text-input--blue"
        placeholder="Confirm Password*"
        />
        <button type="submit" className="btn btn--blue form--btn">REGISTER</button>
      </form>
      <div className="form--toggle">
        <span>Already have an account?</span>
        <button onClick={() => setToggle('login')} className="form--toggle-btn">
          Login
        </button>
      </div>
    </div>
  )
}
