import React from 'react';

export default class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.fn = this.fn.bind(this);
    this.onChange = this.onChange.bind(this);
    this.navigate = this.navigate.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
    this.onApiError = this.onApiError.bind(this);
    this.clear = this.clear.bind(this);
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // construct a map from the dotted path of the given name so we can set the state of the nested object

    const nameParts = name.split('.');
    const obj = this.state[nameParts[0]];

    let subObj = obj;
    for (let i = 1; i < nameParts.length - 1; i++) {
      subObj = subObj[nameParts[i]];
    }
    subObj[nameParts[nameParts.length - 1]] = value;

    const state = {};
    state[nameParts[0]] = obj;
    this.setState(state);
  }

  preventDefault(e) {
    if (e && e.preventDefault && e.stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  navigate(path, callback) {
    if (path) {
      this.props.history.push(path.toString());
      if (callback) {
        callback();
      }
    }
  }

  fn(fn, arg1, arg2, arg3, arg4) {
    return (e) => {
      this.preventDefault(e);
      if (fn) {
        fn(arg1, arg2, arg3, arg4);
      }
    };
  }

  onApiError(apiError) {
    switch (apiError.status) {
      case "BAD_REQUEST":
        this.setState({
          errorMessage: "A validation error has occurred.",
          apiError: apiError
        });
        break;
      case "NOT_FOUND":
        this.setState({
          errorMessage: "Could not find object.",
          apiError: apiError
        });
        break;
      default:
        this.setState({
          errorMessage: "An unknown error has occurred. Please try again later."
        })
    }
  }

  clear() {
    this.setState({
      errorMessage: null,
      apiError: null
    })
  }

  getValidationState(name) {
    if (this.state.apiError && this.state.apiError.hasError(name)) {
      return "error";
    }
    return null;
  }
}