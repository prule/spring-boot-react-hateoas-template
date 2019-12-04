import './App.css'

import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {useStateValue} from "./State";
import {Route} from "react-router";
import HomePage from "./app/home/HomePage";
import Alert from "react-bootstrap/Alert";
import {onApiError} from "./Api";
import ActionType from "./common/ActionType";
import Index from "./app/Index";
import LoginPage from "./app/LoginPage";
import PersonsPage from "./app/person/PersonsPage";
import PersonPage from "./app/person/PersonPage";
import PersonPetPage from "./app/person/PersonPetPage";
import Content from "./Content";

export default function Main(props) {

  return (
    <div>
      {alert &&
      <Alert variant={alert.type}>{alert.message ? alert.message : 'Unknown alert'}</Alert>
      }
      <Content>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/app/persons" component={PersonsPage}/>
        <Route exact path="/app/persons/:key" component={PersonPage}/>
        <Route exact path="/app/persons/:personKey/pets/:petKey" component={PersonPetPage}/>
      </Content>
    </div>
  )

}

