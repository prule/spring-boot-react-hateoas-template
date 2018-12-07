import React from "react";
import Component from "../common/Component";
import {Col, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import PropTypes from "prop-types";

export default class InputAddress extends Component {

  static propTypes = {
    value: PropTypes.object
  };


  constructor(props) {
    super(props);
    this.state = {
      address: this.props.value
    }
  }

  render() {

    const address = this.state.address;

    return (
      <div>

        <FormGroup controlId="line1" validationState={this.getValidationState('line1')}>
          <Col componentClass={ControlLabel} sm={2}>
            Line 1
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Address line 1" value={address.line1} name="address.line1" onChange={this.onChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="line2" validationState={this.getValidationState('line2')}>
          <Col componentClass={ControlLabel} sm={2}>
            Line 2
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Address line 2" value={address.line2} name="address.line2" onChange={this.onChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="city" validationState={this.getValidationState('city')}>
          <Col componentClass={ControlLabel} sm={2}>
            City
          </Col>
          <Col sm={4}>
            <FormControl type="text" placeholder="City" value={address.city} name="address.city" onChange={this.onChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="state" validationState={this.getValidationState('state')}>
          <Col componentClass={ControlLabel} sm={2}>
            State
          </Col>
          <Col sm={4}>
            <FormControl type="text" placeholder="Address line 1" value={address.state} name="address.state" onChange={this.onChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="country" validationState={this.getValidationState('country')}>
          <Col componentClass={ControlLabel} sm={2}>
            Country
          </Col>
          <Col sm={4}>
            <FormControl type="text" placeholder="Country" value={address.country} name="address.country" onChange={this.onChange}/>
          </Col>
        </FormGroup>

      </div>
    );
  }
}