// @flow

import Api from '../../core/Api';
import Resource from "../../common/domain/Resource";
import PersonName from "./PersonName";
import Address from "../../common/domain/Address";
import SearchPage from "../../common/domain/SearchPage";
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

  save(): Promise<Person> {
    // todo handle create
    let link = this.link(LinkRelations.update);
    return Api.do(link, this)
      .then(
        (response) => {
          return new Person(response);
        }
      )
  };

  searchPets(user): Promise<SearchPage<Pet>> {
    return Pet.search(user,{personKey: this.key});
  };

  static find(user: User, key): Promise<Person> {

    let link = user
      .link(LinkRelations.personFind)
      .pathParam('key', key);

    return Api.do(link)
      .then(response => {
        return new Person(response);
      });

  };

  static search(user, params): Promise<SearchPage<Person>> {

    let link = user.link(LinkRelations.personSearch)
      .withQueryParams(params);

    return Api.do(link)
      .then(response => {
        return new SearchPage(response, 'personResourceList', (item) => new Person(item));
      });

  };

}