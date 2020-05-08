// @flow

import log from './Logging';
import axios from "axios"
import ApiError from "./ApiError"
import {Link} from "../common/domain/Link"
import AlertMessage from "../common/domain/AlertMessage"
import ActionType from "../common/ActionType"

export function onApiError(dispatch, setter) {
  return (error) => {
    const alert = new AlertMessage('danger', error.message);
    dispatch(ActionType.forAlert(alert));
    if (setter) {
      setter(error);
    }
  }
}

// todo this should be invoked when necessary
export function clearAlert(dispatch) {
  dispatch({
    type: 'alert',
    alert: null
  })
}

export default class Api {

  static requestCount = 0;

  static dispatch;

  static logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  static setToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  static getToken = () => {
    return localStorage.getItem('token');
  };

  static hasToken() {
    return !(this.getToken() === undefined || this.getToken() === null);
  }

  static get = async (link: Link) => {
    return await Api.do("get", link, null);
  };

  static put = async (link: Link, body: object) => {
    return await Api.do("put", link, body);
  };

  static post = async (link: Link, body: object) => {
    return await Api.do("post", link, body);
  };

  static do = async (link: Link, body: object) => {

    const method = link.type;

    try {

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      };

      const token = Api.getToken();

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      Api.updateLoading(1);

      const response = await axios({
        method: method,
        url: link.toString(),
        data: body,
        headers: headers
      });

      Api.updateLoading(-1);

      return response.data;

    } catch (error) {

      Api.updateLoading(-1);

      log('error caught', error);
      const response = error.response;

      if (response) {
        // 400
        if (response.status === 0 || (response.status >= 400 && response.status < 500)) {
          log('response is ', response);

          if (response.status === 401) {
            Api.logout();
          }

          if (response.data.apierror) {
            throw new ApiError(response.data.apierror);
          }
          if (response.data.body) {
            throw new ApiError(response.data.body);
          }
          if (response.data) {
            throw new ApiError(response.data);
          }
        }
      }

      log('throwing unexpected');
      // unexpected errors
      throw new ApiError({
        status: 0,
        timestamp: new Date(),
        message: 'An unexpected error occurred. Please try again later.'
      });

    }

  }

  static updateLoading(delta: number) {
    Api.requestCount += delta;
    console.log('requestCount', Api.requestCount);
    if (Api.requestCount <= 1) {
      Api.dispatch(ActionType.forResource(ActionType.LOADING, Api.requestCount === 1));
    }
  }
}