import { LandingPage } from './pages/LandingPage';
import { Navbar } from './components/Navbar'
import './sass/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
