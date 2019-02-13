import React from "react";
import {Button, ButtonToolbar, Col, ControlLabel, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import Component from "./common/Component";
import ErrorMessage from "./common/ErrorMessage";
import Routes from "../Routes";
import Api from './Api';
import App from "../App";

import "react-datepicker/dist/react-datepicker.css";

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state.login = {
      username: '',
      password: ''
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onCancel() {
    this.navigate(Routes.main.home());
  }

  onSubmit() {
    this.clear();
    const login = this.state.login;
    Api.post(App.index.link('login'), login)
      .then((response) => {
        console.log('response', response);
        App.token = response.token;
        this.navigate(Routes.person.persons())
      })
      .catch(this.onApiError);
  };

  render() {

    const login = this.state.login;

    return (
      <div>
        <h2>Login</h2>
        <br/>

        <ErrorMessage message={this.state.errorMessage}/>

        <div>
          <Form horizontal>

            <FormGroup controlId="username" validationState={this.getValidationState('username')}>
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Username" value={login.username} name="login.username" onChange={this.onChange}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="password" validationState={this.getValidationState('password')}>
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Password" value={login.password} name="login.password" onChange={this.onChange}/>
              </Col>
            </FormGroup>

            <Row>
              <Col sm={10} smPush={2}>
                <ButtonToolbar>
                  <Button bsStyle="primary" onClick={this.onSubmit}>Login</Button>
                  <Button onClick={this.onCancel}>Cancel</Button>
                </ButtonToolbar>
              </Col>
            </Row>

          </Form>

        </div>
      </div>
    )
  }

}

