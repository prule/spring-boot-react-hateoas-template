import Api from '../../Api';
import App from '../../App';
import Resource from "../../common/Resource";
import PersonName from "./PersonName";
import Address from "../../common/Address";
import Page from "../../common/Page";
import Pet from "../pet/Pet";

export default class Person extends Resource {

  key;
  name;
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
    let link = this.link('update');
    return Api.put(link, this)
      .then(
        (response) => {
          return new Person(response);
        }
      );
  };

  searchPets(index) {
    return Pet.search(index,{personKey: this.key});
  };

  static find(index, key) {

    let link = index
      .link('person-find')
      .pathParam('key', key);

    return Api.get(link)
      .then(response => {
        return new Person(response);
      });

  };

  static search(index, params) {

    let link = index.link('person-search')
      .withQueryParams(params);

    return Api.get(link)
      .then(response => {
        return new Page(response, 'personResourceList', (item) => new Person(item));
      });

  };

}