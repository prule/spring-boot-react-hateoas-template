// @flow

import Api from '../../core/Api';
import Resource from "../../common/domain/Resource";
import PetName from "./PetName";
import SearchPage from "../../common/domain/SearchPage";
import Person from "../person/Person";
import LinkRelations from "../LinkRelations";

export default class Pet extends Resource {

  key: string;
  name: PetName;
  dateOfBirth: Date;
  owner: Person;

  constructor(data = {}) {
    super(data._links);
    this.key = data.key;
    this.name = new PetName(data.name);
    this.dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
    this.owner = new Person(data.owner);
  }

  save(): Promise<Pet> {
    const link = this.key ? this.link(LinkRelations.update) : this.owner.link(LinkRelations.petCreate);

    return Api.do(link, this)
      .then((response) => {
        return new Pet(response);
      })
  };

  static find(user, key) {

    let link = user
      .link(LinkRelations.petFind)
      .pathParam('key', key);

    return Api.do(link)
      .then((response) => {
        return new Pet(response);
      });
  };

  static search(index, searchCriteria) {

    let link = index
      .link(LinkRelations.petSearch)
      .withQueryParams(searchCriteria);

    return Api.do(link)
      .then((response) => {
        return new SearchPage(response, 'petResourceList', (item) => new Pet(item));
      });
  };

}