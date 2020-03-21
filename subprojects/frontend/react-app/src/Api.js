// @flow

import axios from "axios"
import ApiError from "./common/ApiError"
import {Link} from "./common/Link"
import AlertMessage from "./common/AlertMessage"
import ActionType from "./common/ActionType"

export function onApiError(dispatch, setter) {
  return (error) => {
    console.log('onApiError', error);
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

  static logout = () => {
    localStorage.removeItem('token');
  };

  static setToken = (token) => {
    localStorage.setItem('token', token);
  };

  static getToken = () => {
    return localStorage.getItem('token');
  };

  static hasToken() {
    return !!this.getToken();
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

  static do = async (method: string, link: Link, body: object) => {

    try {

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      };

      const token = Api.getToken();

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios({
        method: method,
        url: link.toString(),
        data: body,
        headers: headers
      });

      return response.data;

    } catch (error) {

      const response = error.response;

      if (response) {
        // 400
        if (response.status === 0 || (response.status >= 400 && response.status < 500)) {
          console.log('response is ', response);
          const apiError = response.data.apierror ? response.data.apierror : response.data;
          throw new ApiError(apiError);
        }
      }

      // unexpected errors
      throw new ApiError({
        status: 0,
        timestamp: new Date(),
        message: 'An unexpected error occurred. Please try again later.'
      });

    }

  }

}