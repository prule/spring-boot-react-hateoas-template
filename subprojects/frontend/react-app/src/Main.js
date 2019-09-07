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

export default function Main(props) {
  const [{index, alert}, dispatch] = useStateValue();

  useEffect(() => {
    Index.load()
      .then((index) => dispatch(ActionType.forResource(ActionType.INDEX, index)))
      .catch(onApiError(dispatch))
  }, []);

  if (index == null) {
    return null;
  }

  return (
    <div>
          {alert &&
          <Alert variant={alert.type}>{alert.message ? alert.message : 'Unknown alert'}</Alert>
          }
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/persons" component={PersonsPage}/>
          <Route exact path="/persons/:key" component={PersonPage}/>
          <Route exact path="/persons/:personKey/pets/:petKey" component={PersonPetPage}/>
    </div>
  )

}

