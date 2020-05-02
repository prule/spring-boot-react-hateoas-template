// @flow

export default class SearchPage<T> {

  size: number;
  totalElements: number;
  totalPages: number;
  number: number; // current page
  list: Array<T>;

  constructor(result, resourceListName, itemFactory) {
    this.size = result.page.size;
    this.totalElements = result.page.totalElements;
    this.totalPages = result.page.totalPages;
    this.number = result.page.number;
    this.list = [];

    if (result._embedded && result._embedded[resourceListName]) {
      for (const item of result._embedded[resourceListName]) {
        this.list.push(itemFactory(item));
      }
    }
  }
}