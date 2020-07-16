import React, { useContext } from "react";
import { Link } from "react-router-dom"; // useHistory
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";

const NavbarM = (props) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    AuthContext
  );
  //const history = useHistory();

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        //history.push("/register") // ADDED to redirect logout to register
      }
    });
  };

  // This navbar will be rendered when not logged in
  const unauthenticatedNavBar = () => {
    // <> react fragment
    return (
      <>
        <Link to="/home">
          <li className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/auth/login">
          <li className="nav-item nav-link">Login</li>
        </Link>
        <Link to="/auth/register">
          <li className="nav-item nav-link">Register</li>
        </Link>
      </>
    );
  };

  // This navbar will be rendered when logged in
  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/home">
          <li className="nav-item nav-link">Home</li>
        </Link>

        {user.privilege === "admin" ? (
          <Link to="/admin">
            <li className="nav-item nav-link">Admin</li>
          </Link>
        ) : null}

        <button
          type="button"
          className="btn btn-link nav-item nav-link"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
  };

  // Navbar from bootstrap documentation, We are using Links so, replace <a> with <Link? component
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">
        <div className="navbar-brand">Covid-Share</div>
      </Link>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarM;
