import './App.css';
import {BrowserRouter,Route} from "react-router-dom"
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import LandingPage from "./pages/LandingPage/LandingPage"
import HomePage from "./pages/HomePage/HomePage"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
            <Route exact  path="/" component={LandingPage}/>
            <Route exact  path="/register" component={Register}/>
            <Route exact  path="/login"  component={Login}/>
            <Route exact  path="/home" component={HomePage}/>
     </BrowserRouter>
    </div>
  );
}

export default App;
