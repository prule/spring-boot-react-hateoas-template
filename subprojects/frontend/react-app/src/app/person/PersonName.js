// @flow

import Str from "../../common/Str";

export default class PersonName {
  firstName: string;
  lastName: string;
  otherNames: string;

  constructor(name = {}) {
    this.firstName = Str.valueOrEmpty(name.firstName);
    this.lastName = Str.valueOrEmpty(name.lastName);
    this.otherNames = Str.valueOrEmpty(name.otherNames);
  }

  fullName(): string {
    return Str.join([this.firstName, this.otherNames, this.lastName], " ");
  }
}