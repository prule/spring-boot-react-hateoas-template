// @flow

import Api from '../../Api';
import Resource from "../../common/domain/Resource";
import PersonName from "./PersonName";
import Address from "../../common/domain/Address";
import Page from "../../common/domain/Page";
import Pet from "../pet/Pet";
import LinkRelations from "../LinkRelations";
import User from "../user/User";

export default class Person extends Resource {

  key: string;
  name: PersonName;
  address;
  dateOfBirth;

  constructor(data = {}) {
    super(data._links);
    this.key = data.key;
    this.name = new PersonName(data.name);
    this.address = new Address(data.address);
    this.dateOfBirth = new Date(data.dateOfBirth);
  }

  save() {
    // todo handle create
    let link = this.link(LinkRelations.update);
    return Api.do(link, this)
      .then(
        (response) => {
          return new Person(response);
        }
      )
  };

  searchPets(user) {
    return Pet.search(user,{personKey: this.key});
  };

  static find(user: User, key) {

    let link = user
      .link(LinkRelations.personFind)
      .pathParam('key', key);

    return Api.do(link)
      .then(response => {
        return new Person(response);
      });

  };

  static search(user, params) {

    let link = user.link(LinkRelations.personSearch)
      .withQueryParams(params);

    return Api.do(link)
      .then(response => {
        return new Page(response, 'personResourceList', (item) => new Person(item));
      });

  };

}