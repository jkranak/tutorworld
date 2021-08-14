import { LandingPage } from "./pages/LandingPage";
import { Navbar } from './components/Navbar'
import './sass/main.scss'

function App() {
  return (
    <div className="App">
      <Navbar />
      <LandingPage />
    </div>
  );
}

export default App;
