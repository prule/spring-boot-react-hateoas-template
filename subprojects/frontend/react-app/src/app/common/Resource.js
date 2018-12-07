import {Link} from "./Link";


export default class Resource {

  links;

  constructor(links) {
    this.links = links ? links : [];
  }

  link(rel) {
    let link = this.links[rel];
    if (link) {
      return new Link(link.href);
    }
    else {
      return null;
    }
  }
}
