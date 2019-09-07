import React from "react";
import DatePicker from "react-datepicker";
import Component from "../common/Component";
import PropTypes from "prop-types";

export default class InputDatePicker extends Component {

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func
  };


  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  onChange(date) {
    this.setState({
      value: date
    });
    if(this.props.onChange) {
      this.props.onChange({
        target: {
          name: this.props.name,
          value: date,
          type: 'date'
        }
      })
    }
  }

  render() {
    return (
      <DatePicker
        className="form-control"
        selected={this.state.value}
        onChange={this.onChange}
        dateFormat="dd/MM/YYYY"
      />
    );
  }
}