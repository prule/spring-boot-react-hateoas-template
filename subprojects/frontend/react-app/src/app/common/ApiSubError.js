export default class ApiSubError {
  object;
  field;
  rejectedValue;
  message;

  constructor(subError) {
    this.object = subError.object;
    this.field = subError.field;
    this.rejectedValue = subError.rejectedValue;
    this.message = subError.message;
  }
}