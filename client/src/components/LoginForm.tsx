import { FormEvent, useState, FC } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { emptyUserLogin, UserLogin } from '../interfaces/User';
import { useDispatch } from 'react-redux';
import { login } from '../services/apiUser';
import { authenticate } from '../redux/actions/authenticate';
import { useHistory } from 'react-router-dom';

interface Props {
  setToggle: Function
}

export const LoginForm: FC<Props> = ({setToggle}: Props) => {
  const [userLogin, setUserLogin] = useState<UserLogin>(emptyUserLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event: any) => {
    setUserLogin(user => ({...user, [event.target.name]: event.target.value}))
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = userLogin;

    // confirming if fields aren't empty
    if (password && email) {
      const res = await login({ email, password })
      if (res.error) {
        alert(`${res.message}`)
        setUserLogin(emptyUserLogin);
      } else {
        // getting token from back-end
        const { token, user } = res;
        // setting token to header
        localStorage.setItem('x-auth-token', token);
        // set global state to authenticated
        dispatch(authenticate(user));
        // redirect to dashboard
        history.push('/dashboard');
      }
    } else alert(`Please insert your e-mail and password.`);
  }
  
  return (
    <div className="form login-form">
      <div className="form--title">
        <h1 className="before-icon">Sign In</h1>
        <FaSignInAlt className="lib-icon form--icon"/>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="email" id="email" name="email" required onChange={handleChange} value={userLogin.email} placeholder="E-mail address*" className="text-input text-input--blue"/>
        <input type="password" id="password" name="password" placeholder="Password*" required onChange={handleChange} value={userLogin.password}
        className="text-input text-input--blue"
        />
        <button className="btn btn--blue form--btn" type="submit">SIGN IN</button>
      </form>
      <div className="form--toggle">
        <span>Don't have an account?</span>
        <button onClick={() => setToggle('register')} className="form--toggle-btn">
          Register as a student
        </button>
      </div>
    </div>
  )
}
