import Str from "../Str";

export default class Address {
  line1;
  line2;
  city;
  state;
  postcode;
  country;

  constructor(address) {
    if (address) {
      this.line1 = Str.valueOrEmpty(address.line1);
      this.line2 = Str.valueOrEmpty(address.line2);
      this.city = Str.valueOrEmpty(address.city);
      this.state = Str.valueOrEmpty(address.state);
      this.postcode = Str.valueOrEmpty(address.postcode);
      this.country = Str.valueOrEmpty(address.country);
    }
  }

  asOneLine() {
    return Str.join([this.line1, this.line2, this.city, this.state, this.country, this.postcode]);
  }
}