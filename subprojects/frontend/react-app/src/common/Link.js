import Environment from './Environment';
import Str from "./Str";
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
  // buildQueryParams() {
  //   // get the query part of the url
  //   let href = '';
  //   let queryIndex = this.href.indexOf('?');
  //   if (queryIndex > -1) {
  //     href = this.href.substr(queryIndex);
  //   }
  //
  //   // build map of existing params
  //   const allParams = {};
  //   let keyAndValues = href.split('&');
  //   for (let keyAndValue of keyAndValues) {
  //     let parts = keyAndValue.split('=');
  //     if (parts.length === 2) {
  //       allParams[parts[0]] = parts[1];
  //     }
  //   }
  //
  //   // merge in all given params
  //   if (this.queryParams) {
  //     for (const key in this.queryParams) {
  //       if (this.queryParams.hasOwnProperty(key)) {
  //         allParams[key] = this.queryParams[key];
  //       }
  //     }
  //   }
  //
  //   // build one query string with all params
  //   let queryString = '?';
  //   for (const key in allParams) {
  //     if (this.queryParams.hasOwnProperty(key)) {
  //       queryString += key + '=' + allParams[key];
  //     }
  //   }
  //
  //   return queryString;
  // }

  toString() {
    return this.replacePathParams() + this.buildQueryParams();
  }
}