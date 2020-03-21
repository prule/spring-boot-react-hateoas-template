export default class Page {

  size;
  totalElements;
  totalPages;
  number;
  list;

  constructor(result, resourceListName, itemFactory) {
    console.log('result', result);
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