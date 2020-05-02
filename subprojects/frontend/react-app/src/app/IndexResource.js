// @flow

import {Link} from "../common/domain/Link";
import Api from "../core/Api";
import Resource from "../common/domain/Resource";

export default class IndexResource extends Resource {

  constructor(data) {
    super(data._links);
  }

  static load(): Promise<IndexResource> {

    const href = new Link("/api/1/index");
    return Api.do(href)
      .then((response) => {
        return new IndexResource(response);
      });

  };
}
