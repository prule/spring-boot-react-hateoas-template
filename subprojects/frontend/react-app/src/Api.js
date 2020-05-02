// @flow

import axios from "axios"
import ApiError from "./common/domain/ApiError"
import {Link} from "./common/domain/Link"
import AlertMessage from "./common/domain/AlertMessage"
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
    window.location.href='/login';
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
// Add a response interceptor
//     axios.interceptors.response.use(function (response) {
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       // Do something with response data
//       return response;
//     }, function (error) {
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       // Do something with response error
//       console.log(error);
//       return Promise.reject(error);
//     });

    const method = link.type;

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

      console.log('error caught', error);
      const response = error.response;

      if (response) {
        // 400
        if (response.status === 0 || (response.status >= 400 && response.status < 500)) {
          console.log('response is ', response);

          if (response.status === 401) {
            Api.logout();
          }

          if (response.data.apierror) {
            console.log('throwing response.data.apiError', response.data.apierror);
            throw new ApiError(response.data.apierror);
          }
          if (response.data.body) {
            console.log('throwing response.data.body', response.data.body);
            throw new ApiError(response.data.body);
          }
          if (response.data) {
            console.log('throwing response.data', response.data);
            throw new ApiError(response.data);
          }
        }
      }

      console.log('throwing unexpected');
      // unexpected errors
      throw new ApiError({
        status: 0,
        timestamp: new Date(),
        message: 'An unexpected error occurred. Please try again later.'
      });

    }

  }

}