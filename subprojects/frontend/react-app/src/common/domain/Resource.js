// @flow

import {Link} from "./Link";
import LinkRelation from "./LinkRelation";


export default class Resource {

  links;

  constructor(links) {
    this.links = links ? links : [];
  }

  link(rel: LinkRelation): Link {
    let link = this.links[rel.name];
    if (link) {
      return new Link(link.href, link.type);
    }
    else {
      return null;
    }
  }

  hasLink(rel: LinkRelation): boolean {
    return !!this.links[rel.name];
  }
}
