// @flow

import ApiSubError from "./ApiSubError";

export default class ApiError {
  status: number;
  timestamp;
  message: string;
  debugMessage: string;
  subErrors: Array<ApiSubError>;

  constructor(apiError) {
    this.status = apiError.status;
    this.timestamp = apiError.timestamp;
    this.message = apiError.message;
    this.debugMessage = apiError.debugMessage;

    this.subErrors = [];

    if (apiError.subErrors) {
      for (let se of apiError.subErrors) {
        this.subErrors.push(new ApiSubError(se));
      }
    }
  }

  error(field): Array<ApiSubError> {
    return this.subErrors.filter((subError) => subError.field === field);
  }

  hasError(field): boolean {
    return this.error(field).length > 0;
  }

}