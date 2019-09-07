// @flow

import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import Routes from '../Routes';
import Api from '../Api';

export default class Menu extends Component {

  render() {
    return (
        <Navbar collapseOnSelect fixedTop inverse>
          <Navbar.Brand href="#home">Pets and Owners</Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href={Routes.person.persons()}>Owners</Nav.Link>
              <Nav.Link href={Routes.main.home()} onClick={Api.logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

