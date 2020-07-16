import React from "react";
import LandingPage from "./components/LandingPage.js";
import Register from "./components/Register.js";
import DonatePage from "./components/DonatePage.js";

import HomePage from "./components/HomePage.js";
import TwitterContainer from "./components/TwitterContainer.js";
import ReactDOM from "react-dom";
import Login from "./components/Login.js";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import { AuthContext } from './context/AuthContext'
//import Todos from "./Components/Todos";
//import Admin from "./Components/Admin";
//import PrivateRoute from "./hocs/PrivateRoute";
//import UnPrivateRoute from "./hocs/UnPrivateRoute";

function App() {
  return (
    <Router>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/donate" component={DonatePage} />
    </Router>
  );
}

export default App;
