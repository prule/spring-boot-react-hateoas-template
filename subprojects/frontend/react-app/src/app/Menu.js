import React, {Component} from 'react';
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import Routes from '../Routes';

export default class Menu extends Component {

  render() {
    return (

      <Navbar collapseOnSelect fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={Routes.main.home()}>Pets and Owners</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={Routes.person.persons()}>
              <NavItem eventKey={1}>
                Owners
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}