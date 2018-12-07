import axios from "axios";
import ApiError from "./common/ApiError";

export default class Api {

  static get = async (link) => {
    return await Api.do("get", link, null);
  };

  static put = async (link, body) => {
    return await Api.do("put", link, body);
  };

  static do = async (method, link, body) => {

    try {

      const response = await axios({
        method: method,
        url: link.toString(),
        data: body,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });

      return response.data;

    } catch (error) {

      const response = error.response;

      if (response) {
        // 400
        if (response.status >= 400 && response.status < 500) {
          const apiError = response.data.apierror;
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