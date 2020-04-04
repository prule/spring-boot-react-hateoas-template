import Environment from '../Environment';
import Str from "../Str";
import queryString from 'query-string';

export class Link {

  href = null;
  pathParams = {};
  queryParams;

  constructor(href) {
    const env = Environment.instance();
    this.href = href.startsWith('http') ? href : env.api + href;
  }

  pathParam(key, value) {
    this.pathParams[key] = value;
    return this;
  }

  withQueryParams(params) {
    this.queryParams = params;
    return this;
  }

  replacePathParams() {
    return Str.replaceTemplates(this.href, this.pathParams);
  }

  buildQueryParams() {
    return '?' + queryString.stringify(this.queryParams);
  }

  toString() {
    return this.replacePathParams() + this.buildQueryParams();
  }
}