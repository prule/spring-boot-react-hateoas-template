import React from "react"

import Component from "../common/Component"
import {DateTime} from "luxon"
import PropTypes from 'prop-types';

/**
 * Displays the current time in the specified zone, and updates it every minute.
 */
export default class CurrentTime extends Component {

  timer = null;

  constructor(props) {
    super(props);
    this.state = {value: ""}
  }

  componentDidMount = () => {
    this.updateTime();
    this.timer = setInterval(this.updateTime, 60000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  updateTime = () => {
    this.setState({
      value: DateTime.local().setZone(this.props.zone).toFormat(this.props.format)
    })
  };

  render = () => {
    const value = this.state.value;
    return (
      <span className={this.props.className}>
                {value}
            </span>
    )
  }
}

CurrentTime.propTypes = {
  zone: PropTypes.string,
  format: PropTypes.string,
  classNames: PropTypes.string,
};