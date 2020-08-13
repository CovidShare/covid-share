import React , { useContext } from "react";
import NavBar from "./NavBar.js";
import "../styles/DonatePage.css";
import logoN from "../assets/LogoNew.png";
import TwitterContainer from "../components/TwitterContainer.js";
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';

import { Container, Row, Col } from "react-bootstrap";


const DonatePage = (props) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    })
  }

  const unauthenticatedUser = () => {
    return (
      <>
        <a href="/login">
          <button className="logIn_logOut">Log In</button>
        </a>

        <a href="/register">
          <button className="signUp">Sign Up</button>
        </a>
      </>
    )
  }

  const authenticatedUser = () => {
    return (
      <button type="button"
        className="logIn_logOut"
        onClick={onClickLogoutHandler}>
        Logout
      </button>
    )
  }



  return (
    <div className="donate">
      <a href="/home">
        <img src={logoN} alt="logo" class="center" />
      </a>
      {!isAuthenticated ? unauthenticatedUser() : authenticatedUser()}
      <NavBar></NavBar>
      <main>
        <Container fluid>
          <Row>
            <Col>
              <br></br>
              <h1 style={{textAlign: "center"}}>Donate to Combat Covid-19</h1>
              <h6 className="subheading"> 
                This page provides links to projects that are raising funds to fight
                the Covid-19 Pandemic. Additionally, links are provided to sources containing 
                useful resources and information on practices to keep people as healthy as 
                possible, both physically and mentally.  
              </h6>
              <br></br>
              <p className="orgs">
                <p className="linkHead">
                  <a
                    href="https://www.globalgiving.org/projects/coronavirus-relief-fund/"
                    target="_blank"
                    className="linkText"
                  >
                    GlobalGiving Coronavirus Relief Fund
                  </a>
                  <a href="https://www.globalgiving.org/" target="_blank">
                    <img
                      src="https://files.globalgiving.org/pfil/39943/pict_original.png?m=1556828657000"
                      alt="GlobalGiving Logo"
                      width="200"
                      height="120"
                      className="logo1"
                    ></img>
                  </a>
                </p>
                GlobalGiving is a US crowdfunding platform to raise money for
                charitable projects. Their Covid-19 Relief Fund aims to provide
                relief in a two-fold approach: short term and long term relief.
                Short term efforts are aimed at providng Personal Protective
                Equipment (PPE) to health care workers, medical supplies to
                hospitals, essential supplies to struggling families, and many
                other things. GlobalGiving plans to transition to long-term
                relief efforts in accordance to the pandemic's progression by
                supporting long-term education and recovery efforts in local
                organizations in communities around the US.
              </p>
              <p className="orgs">
                <p className="linkHead">
                  <a
                    href="https://www.directrelief.org/emergency/coronavirus-outbreak/"
                    target="_blank"
                    className="linkText"
                  >
                    DirectRelief Coronavirus Pandemic Fund
                  </a>
                  <a href="https://www.directrelief.org/" target="_blank">
                    <img
                      src="https://i1.wp.com/www.directrelief.org/wp-content/uploads/DirectRelief_Logo_RGB.png?ssl=1"
                      alt="DirectRelief Logo"
                      width="270"
                      height="120"
                      className="logo2"
                    ></img>
                  </a>
                </p>
                DirectRelief is a non-profit humanitarian organization active in
                the US and more than 80 other countries with a mission to
                improve the lives of people affected by poverty and emergency
                situations. DirectRelief's relief efforts are focused on
                providing PPE and critical care medications to health care
                workers. They have currently delivered 12 million N95 and
                surgical masks, 4 million gloves, and 1 million face shields to
                health care workers.
              </p>
              <p className="orgs">
                <p className="linkHead">
                  <a
                    href="https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/managing-stress-anxiety.html"
                    target="_blank"
                    className="linkText"
                  >
                    CDC Coronavirus: Coping with Stress
                  </a>
                  <a href="https://www.cdc.gov/" target="_blank">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/71/US_CDC_logo.svg"
                      alt="CDC Logo"
                      width="220"
                      height="80"
                      className="logo3"
                    ></img>
                  </a>
                </p>
                This CDC source provides a myriad of resources and hotlines that
                can be contacted to help with the mental health effects
                associated with the Covid-19 pandemic. In addition to the
                aforementioned resources to be contacted in the event of a
                mental health emergency, this site provides tips and information
                on ways to take care of one's mental health and feel the best
                they possibly can during the pandemic. A very important resource
                providing assistance in an area that might potentially be
                overlooked in the hectic and uncertain nature of the pandemic.
              </p>
              <br></br>
            </Col>
          </Row>
        </Container>
      </main>
      <div className="footer">
        <p>COVIDSHARE</p>
      </div>
    </div>
  );
};

export default DonatePage;
