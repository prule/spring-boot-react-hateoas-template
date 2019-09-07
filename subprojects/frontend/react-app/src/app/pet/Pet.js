import Api from '../../Api';
import App from '../../App';
import Resource from "../../common/Resource";
import PetName from "./PetName";
import Page from "../../common/Page";
import Person from "../person/Person";

export default class Pet extends Resource {

  key;
  name;
  dateOfBirth;
  owner;

  constructor(data = {}) {
    super(data._links);
    this.key = data.key;
    this.name = new PetName(data.name);
    this.dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
    this.owner = new Person(data.owner);
  }

  save() {
    const link = this.key ? this.link('update') : this.owner.link('pet-create');
    const method = this.key ? 'put' : 'post';

    return Api.do(method, link, this)
      .then((response) => {
        return new Pet(response);
      })
  };

  static find(index, key) {

    let link = index
      .link('pet-find')
      .pathParam('key', key);

    return Api.get(link)
      .then((response) => {
        return new Pet(response);
      });
  };

  static search(index, searchCriteria) {

    let link = index
      .link('pet-search')
      .withQueryParams(searchCriteria);

    return Api.get(link)
      .then((response) => {
        return new Page(response, 'petResourceList', (item) => new Pet(item));
      });
  };

}