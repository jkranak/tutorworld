import './sass/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Application } from "./pages/Application";
import { Login } from "./pages/Login";
import { Landing } from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/application" exact component={Application}/>
        <Route path="/login" exact component={Login}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
