import React from 'react';
//import { AuthContext } from './context/AuthContext'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
//import Admin from "./Components/Admin";
//import PrivateRoute from "./hocs/PrivateRoute";
//import UnPrivateRoute from "./hocs/UnPrivateRoute";


function App() {
  // Get data from the context (this is the consumer)
  //const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // Testing
  //console.log(user);
  //console.log(isAuthenticated);

  return (
    <Router>
      <Navbar/>
      <Route exact path="/home" component = {Home}/>
      <Route path="/auth/login" component = {Login}/>
      <Route path="/auth/register" component = {Register}/>
    </Router>
  );
}

export default App;
