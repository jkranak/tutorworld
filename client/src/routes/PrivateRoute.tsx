import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

// TO-DO fix typescript any
const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const auth = useSelector((state: RootState) => state.authenticate);

  return (
    <Route
      {...rest}
      render={(props) => (auth === false || auth === null || !Object.keys(auth).length ? (
        <Redirect to={{pathname:'/login', 
        state: {toggle: 'login'}}} />
      ) : (
        <Component {...props} />
      ))}
    />
  );
};

export default PrivateRoute;