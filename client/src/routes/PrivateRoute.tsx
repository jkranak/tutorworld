import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// TO-DO fix typescript any
const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const auth = useSelector((state: any) => state.authenticate);

  return (
    <Route
      {...rest}
      render={(props) => (auth === false || auth === null || !Object.keys(auth).length ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      ))}
    />
  );
};

export default PrivateRoute;