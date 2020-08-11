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
import Prevention from "./components/Prevention";
import Immunocompromised from "./components/Immunocompromised.js";
import FeelingSick from "./components/FeelingSick.js";
import Share from "./components/Share";
import StatesMap from "./components/StatesMap.js";
import TestingCenters from "./components/TestingCenters.js";

import TwitterContainer from "./components/TwitterContainer.js";
import ReactDOM from "react-dom";

//import { AuthContext } from './context/AuthContext'

function App() {
  return (
    <Router>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/prevention" component={Prevention} />
      <Route exact path="/immunocompromised" component={Immunocompromised} />
      <Route exact path="/feelingsick" component={FeelingSick} />
      <Route exact path="/states" component={StatesMap} />
      <Route exact path="/testingcenters" component={TestingCenters} />

      <Route exact path="/donate" component={DonatePage} />
      <UnPrivateRoute exact path="/login" component={Login} />
      <UnPrivateRoute exact path="/register" component={Register} />
      <PrivateRoute
        path="/profile"
        privileges={["user", "admin"]}
        component={Profile}
      />
      <PrivateRoute path="/admin" privileges={["admin"]} component={Admin} />
      <PrivateRoute
        path="/profile"
        privileges={["user", "admin"]}
        component={Profile}
      />
      <PrivateRoute path="/admin" privileges={["admin"]} component={Admin} />
      <Route exact path="/share" component={Share} />
    </Router>
  );
}

export default App;
