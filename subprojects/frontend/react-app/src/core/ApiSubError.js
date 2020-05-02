export default class ApiSubError {
  object;
  field: string;
  rejectedValue;
  message: string;

  constructor(subError) {
    this.object = subError.object;
    this.field = subError.field;
    this.rejectedValue = subError.rejectedValue;
    this.message = subError.message;
  }
}