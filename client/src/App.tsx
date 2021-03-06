import './sass/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Application } from './pages/Application';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Search } from './pages/Search';
import PrivateRoute from './routes/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { verifyUser } from './services/apiUser';
import { authenticate } from './redux/actions/authenticate';
import Loader from 'react-loader-spinner';
import { Checkout } from './pages/Checkout';
import { Schedule } from './pages/Schedule';
import { Messages } from './pages/Messages';
import { ViewProfile } from './pages/ViewProfile';
import { Review } from './pages/Review';
import { CalendarPage } from './pages/CalendarPage';
import {RootState} from './redux/store/store'
import { Call } from './pages/Call';
import { SessionDetail } from './pages/SessionDetail';
import Map from './pages/Map';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.authenticate);

  useEffect(() => {
    verifyUser().then(res => {
      if (res.user) {
        dispatch(authenticate(res.user));
      } else {
        dispatch(authenticate(false));
      }
    })
  }, [dispatch])
 
  return (
    auth === null ? 
    <div className="loader-wrapper">
      <Loader 
        type="TailSpin"
        color="#EA4C89"
        height={100}
        width={100}
      />
    </div>
    :
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/application" exact component={Application}/>
        <Route path="/login" exact component={Login}/>
        <PrivateRoute path="/dashboard" exact component={Dashboard}/>
        <PrivateRoute path="/profile/:id" exact component={Profile}/>
        <PrivateRoute path="/profile/" exact component={Profile}/>
        <PrivateRoute path="/search" exact component={Search}/>
        <PrivateRoute path="/checkout" exact component={Checkout}/>
        <PrivateRoute path="/schedule" exact component={Schedule}/>
        <PrivateRoute path="/messages" exact component={Messages}/>
        <PrivateRoute path="/viewprofile" exact component={ViewProfile}/>
        <PrivateRoute path="/review" exact component={Review}/>
        <PrivateRoute path="/calendar" exact component={CalendarPage}/>
        <PrivateRoute path="/call" exact component={Call}/>
        <PrivateRoute path="/session" exact component={SessionDetail}/>
        <PrivateRoute path="/map" exact component={Map}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
