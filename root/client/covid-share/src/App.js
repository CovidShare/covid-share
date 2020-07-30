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

import Blog from './containers/Blog/index.js';
import Posts from './containers/Posts/index.js';
import AddPost from './containers/AddPost/index.js';

//import { AuthContext } from './context/AuthContext'

//trying out the PrivateRoute, please fix

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
      <Route path="/share" component={ Blog }>
        <Route exact path="/posts" component={ Posts } />
        <Route path="/add-post" component={ AddPost } />
      </Route>
    </Router>
  );
}

export default App;
