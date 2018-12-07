import Str from "../common/Str";

export default class PersonName {
  firstName;
  lastName;
  otherNames;

  constructor(name = {}) {
    this.firstName = Str.valueOrEmpty(name.firstName);
    this.lastName = Str.valueOrEmpty(name.lastName);
    this.otherNames = Str.valueOrEmpty(name.otherNames);
  }

  fullName() {
    return Str.join([this.firstName, this.otherNames, this.lastName], " ");
  }
}