import { Button, Form, FormControl } from "react";
import React from "react";
import * as ReactBootStrap from "react-bootstrap";

const NavBar = (props) => {
  return (
    <div>
      <ReactBootStrap.Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <ReactBootStrap.Navbar.Brand href="/home">
          
        </ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto">
          <ReactBootStrap.Nav.Link href="/home">
              HOME
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link href="/share">
              SHARE
            </ReactBootStrap.Nav.Link>

            <ReactBootStrap.NavDropdown
              title="LEARN"
              id="collasible-nav-dropdown"
            >
              <ReactBootStrap.NavDropdown.Item href="/states">
                US STATISTICS
              </ReactBootStrap.NavDropdown.Item>
              <ReactBootStrap.NavDropdown.Item href="prevention">
                PREVENTION  
              </ReactBootStrap.NavDropdown.Item>
              <ReactBootStrap.NavDropdown.Item href="/testingcenters">
                TESTING CENTERS
              </ReactBootStrap.NavDropdown.Item>
              <ReactBootStrap.NavDropdown.Item href="feelingsick">
                FEELING SICK?
              </ReactBootStrap.NavDropdown.Item>
              <ReactBootStrap.NavDropdown.Item href="immunocompromised">
                IMMUNOCOMPROMISED
              </ReactBootStrap.NavDropdown.Item>
            </ReactBootStrap.NavDropdown>
            <ReactBootStrap.Nav.Link href="/donate">
              DONATE
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
            <ReactBootStrap.Nav.Link href="#deets">
              ABOUT US
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link eventKey={2} href="#memes">
              CONTACTS
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </div>
  );
};

export default NavBar;
