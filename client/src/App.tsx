import './sass/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Application } from './pages/Application';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Search } from './pages/Search';
import { Checkout } from './pages/Checkout';
import { Schedule } from './pages/Schedule';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/application" exact component={Application}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/search" exact component={Search}/>
        <Route path="/checkout" exact component={Checkout}/>
        <Route path="/schedule" exact component={Schedule}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
