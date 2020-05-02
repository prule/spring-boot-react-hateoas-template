import {Link} from "../common/domain/Link";
import Api from "../Api";
import Resource from "../common/domain/Resource";

export default class Index extends Resource {

  constructor(data) {
    super(data._links);
  }

  static load() {

    const href = new Link("/api/1/index");
    return Api.do(href)
      .then((response) => {
        return new Index(response);
      });

  };
}
