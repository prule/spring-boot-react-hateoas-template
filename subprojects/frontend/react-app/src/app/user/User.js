// @flow

import Api from '../../Api';
import Resource from "../../common/domain/Resource";
import Page from "../../common/domain/Page";
import LinkRelations from "../LinkRelations";
import Index from "../Index";

export default class User extends Resource {

  key: string;
  firstName: string;
  lastName: string;

  constructor(data = {}) {
    super(data._links);
    this.key = data.key;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }

  save() {
    // todo handle create
    let link = this.link(LinkRelations.update);
    return Api.put(link, this)
      .then(
        (response) => {
          return new User(response);
        }
      )
  };

  static me(index: Index) {

    console.log(index);

      let link = index
        .link(LinkRelations.me);

      console.log('link', link);

      return Api.do(link)
        .then(response => {
          return new User(response);
        });

    };

  static find(index, key) {

    let link = index
      .link('user-find')
      .pathParam('key', key);

    return Api.get(link)
      .then(response => {
        return new User(response);
      });

  };

  static search(index, params) {

    let link = index.link('user-search')
      .withQueryParams(params);

    return Api.get(link)
      .then(response => {
        return new Page(response, 'userResourceList', (item) => new User(item));
      });

  };

}