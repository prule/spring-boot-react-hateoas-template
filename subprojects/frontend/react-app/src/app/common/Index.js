import {Link} from "./Link";
import Api from "../Api";
import Resource from "./Resource";

export default class Index extends Resource {

  constructor(data) {
    super(data._links);
  }

  static load() {

    const href = new Link("/api/1/index");
    return Api.get(href)
      .then((response) => {
        return new Index(response);
      });

  };
}
