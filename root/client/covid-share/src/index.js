import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "./styles/LandingPage.css";
import "./styles/HomePage.css";
import "./styles/CDC.css";
import "./styles/Login.css";
import "./styles/Register.css";
import "./styles/DonatePage.css";

import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./context/AuthContext";
import registerServiceWorker from './utils/registerServiceWorker';

// AuthProvider wrapping app to get globals from AuthContext {children}
ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
registerServiceWorker();