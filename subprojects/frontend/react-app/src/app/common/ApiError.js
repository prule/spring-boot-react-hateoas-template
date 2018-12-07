import ApiSubError from "./ApiSubError";

export default class ApiError {
  status;
  timestamp;
  message;
  debugMessage;
  subErrors;

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

  error(field) {
    return this.subErrors.filter((subError) => subError.field === field);
  }

  hasError(field) {
    return this.error(field).length > 0;
  }

}