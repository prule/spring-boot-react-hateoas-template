import {Alert} from "react-bootstrap";
import PropTypes from 'prop-types';
import React from 'react';

export default class ErrorMessage {

  static propTypes = {
    message: PropTypes.string
  };

  render() {
    return (
      <div>
        {this.props.message &&
        <div id="errorMessage">
          <Alert bsStyle="danger">
            <strong>{this.props.message}</strong>
          </Alert>
        </div>
        }
      </div>
    )
  }
}