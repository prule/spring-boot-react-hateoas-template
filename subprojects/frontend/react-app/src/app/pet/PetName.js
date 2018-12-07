import Str from "../common/Str";

export default class PersonName {
  name;

  constructor(name = {}) {
    this.name = Str.valueOrEmpty(name.name);
  }

  fullName() {
    return this.name;
  }
}