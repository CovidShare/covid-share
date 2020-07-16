import React from "react";
import NavBar from "../components/NavBar.js";
import "../styles/DonatePage.css";
import logoN from "../assets/LogoNew.png";
import TwitterContainer from "../components/TwitterContainer.js";
//import CDC from "../components/CDC.js";
import { Container, Row, Col } from 'react-bootstrap';

const DonatePage = (props) => {
    return (
        <div className = "donate">
            <img src={logoN} alt="logo" class="center"/>
            <button className="logIn">Log In</button>
            <NavBar></NavBar>
            <main>
                <Container fluid>
                    <Row>
                        <Col>
                        <br></br>
                        <h1 className="pageHeader">
                            Organizations Combatting Covid-19
                        </h1>
                        <h5>
                            This page is dedicated to providing resources that we feel are doing a good job combatting the Covid-19 Pandemic. These resources
                            are working to raise funds to combat pandemic and its wide reaching effects and also provide information and resources on keeping
                            oneself as safe and healthy as they can be during these challenging times.
                        </h5>
                        <br></br>
                            <p className = "orgs">
                                <p className = "linkHead">
                                <a href="https://www.globalgiving.org/projects/coronavirus-relief-fund/" target="_blank" className="linkText">
                                    GlobalGiving Coronavirus Relief Fund
                                </a>
                                <a href = "https://www.globalgiving.org/" target = "_blank">
                                <img src="https://files.globalgiving.org/pfil/39943/pict_original.png?m=1556828657000" alt="GlobalGiving Logo" width = "200" height = "120" className="logo1">
                                </img>
                                </a>
                            </p>
                               GlobalGiving is a US crowdfunding platform to raise money for charitable projects.
                               Their Covid-19 Relief Fund aims to provide relief in a two-fold approach: short term and long term relief.
                               Short term efforts are aimed at providng Personal Protective Equipment (PPE) to health care workers, medical supplies
                               to hospitals, essential supplies to struggling families, and many other things. GlobalGiving plans to transition
                               to long-term relief efforts in accordance to the pandemic's progression by supporting long-term education and
                               recovery efforts in local organizations in communities around the US.
                            </p>
                            <p className = "orgs">
                                <p className = "linkHead">
                                <a href="https://www.directrelief.org/emergency/coronavirus-outbreak/" target="_blank" className="linkText" >
                                    DirectRelief Coronavirus Pandemic Fund
                                </a>
                                <a href="https://www.directrelief.org/" target = "_blank">
                                <img src="https://i1.wp.com/www.directrelief.org/wp-content/uploads/DirectRelief_Logo_RGB.png?ssl=1" alt="DirectRelief Logo" width = "270" height = "120" className="logo2">
                                </img>
                                </a>
                             </p>
                                DirectRelief is a non-profit humanitarian organization active in the US and more than 80 other countries with a 
                                mission to improve the lives of people affected by poverty and emergency situations. DirectRelief's relief efforts are
                                focused on providing PPE and critical care medications to health care workers. They have currently delivered 12 million 
                                N95 and surgical masks, 4 million gloves, and 1 million face shields to health care workers. 
                            </p>
                            <p className = "orgs">
                                <p className = "linkHead">
                                <a href="https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/managing-stress-anxiety.html" target="_blank" className="linkText">
                                    CDC Coronavirus: Coping with Stress
                                </a>
                                <a href = "https://www.cdc.gov/" target = "_blank">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/US_CDC_logo.svg" alt="CDC Logo" width = "220" height = "80" className="logo3">
                                </img>
                                </a>
                            </p>
                                This CDC source provides a myriad of resources and hotlines that can be contacted to help with the mental
                                health effects associated with the Covid-19 pandemic. In addition to the aforementioned resources to be contacted
                                in the event of a mental health emergency, this site provides tips and information on ways to take care of one's 
                                mental health and feel the best they possibly can during the pandemic. A very important resource providing assistance
                                in an area that might potentially be overlooked in the hectic and uncertain nature of the pandemic. 
                            </p>
                            <br></br>
                        </Col>
                    </Row>
                </Container>
            </main>
          <div className="footer">
          <p>
            COVIDSHARE
          </p>
        </div>
        </div>
    );
};

export default DonatePage;