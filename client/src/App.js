import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";

import LandingPage from "./components/LandingPage.js";
import Register from "./components/Register.js";
import DonatePage from "./components/DonatePage.js";
import HomePage from "./components/HomePage.js";
import Login from "./components/Login.js";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import Share from "./components/Share";


import TwitterContainer from "./components/TwitterContainer.js";
import ReactDOM from "react-dom";

//import { AuthContext } from './context/AuthContext'

function App() {
  return (
    <Router>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/donate" component={DonatePage} />
      <UnPrivateRoute exact path="/login" component={Login} />
      <UnPrivateRoute exact path="/register" component={Register} />
      <PrivateRoute path="/profile" privileges={["user", "admin"]} component={Profile}/>
      <PrivateRoute path="/admin" privileges={["admin"]} component={Admin}/>
      <Route exact path="/share" component={Share}/>
    </Router>
  );
}

export default App;
