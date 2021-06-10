import './App.css';
import {BrowserRouter,Route} from "react-router-dom"
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import LandingPage from "./pages/LandingPage/LandingPage"
import HomePage from "./pages/HomePage/HomePage"
import Session from './pages/sessionPage/session'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
            <Route exact  path="/" component={LandingPage}/>
            <Route exact  path="/register" component={Register}/>
            <Route exact  path="/login"  component={Login}/>
            <Route exact  path="/home" component={HomePage}/>
            <Route exact  path="/session" component={Session}/>
     </BrowserRouter>
    </div>
  );
}

export default App;
