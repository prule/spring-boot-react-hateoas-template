export default class Page {

  size;
  totalElements;
  totalPages;
  list;

  constructor(result, resourceListName, itemFactory) {
    this.size = result.size;
    this.totalElements = result.totalElements;
    this.totalPages = result.totalPages;
    this.list = [];

    if (result._embedded && result._embedded[resourceListName]) {
      for (const item of result._embedded[resourceListName]) {
        this.list.push(itemFactory(item));
      }
    }
  }
}