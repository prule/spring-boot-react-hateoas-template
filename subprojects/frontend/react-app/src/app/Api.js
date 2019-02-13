import axios from "axios";
import ApiError from "./common/ApiError";
import App from "../App";

export default class Api {

  static get = async (link) => {
    return await Api.do("get", link, null);
  };

  static put = async (link, body) => {
    return await Api.do("put", link, body);
  };

  static post = async (link, body) => {
    return await Api.do("post", link, body);
  };

  static do = async (method, link, body) => {

    try {

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      };

      if (App.token) {
        headers['Authorization'] = `Bearer ${App.token}`
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
      console.log('error is ', error);

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

  };

}