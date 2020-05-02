// @flow

import Api from '../../core/Api';
import Resource from "../../common/domain/Resource";
import SearchPage from "../../common/domain/SearchPage";
import LinkRelations from "../LinkRelations";
import IndexResource from "../IndexResource";

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

  save(): Promise<User> {
    // todo handle create
    let link = this.link(LinkRelations.update);
    return Api.put(link, this)
      .then(
        (response) => {
          return new User(response);
        }
      )
  };

  static me(index: IndexResource): Promise<User> {

    let link = index
      .link(LinkRelations.me);

    return Api.do(link)
      .then(response => {
        return new User(response);
      });

  };

  static find(index, key): Promise<User> {

    let link = index
      .link(LinkRelations.userFind)
      .pathParam('key', key);

    return Api.get(link)
      .then(response => {
        return new User(response);
      });

  };

  static search(index, params): Promise<SearchPage<User>> {

    let link = index.link(LinkRelations.userSearch)
      .withQueryParams(params);

    return Api.get(link)
      .then(response => {
        return new SearchPage(response, 'userResourceList', (item) => new User(item));
      });

  };

}