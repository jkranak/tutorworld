import { LandingPage } from "./pages/LandingPage";
import './sass/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Application } from "./pages/Application";
import { Login } from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="application" exact component={Application}/>
        <Route path="login" exact component={Login}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
