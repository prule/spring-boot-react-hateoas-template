// @flow

import Environment from '../Environment';
import Str from "../Str";
import queryString from 'query-string';

export class Link {

  href: string = null;
  type: string; // contains http method
  pathParams: Object = {};
  queryParams: Object;

  constructor(href: string, type: string) {
    const env = Environment.instance();
    this.href = href.startsWith('http') ? href : env.api + href;
    this.type = type;
  }

  pathParam(key: string, value: string) {
    this.pathParams[key] = value;
    return this;
  }

  withQueryParams(params: Object) {
    this.queryParams = params;
    return this;
  }

  withFields(fields : string) {
    if (!this.queryParams) {
      this.queryParams = {};
    }
    this.queryParams.fields = fields;
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