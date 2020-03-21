import QueryString from "./QueryString";

it('qs_parameters_should_be_available', () => {
  let queryString = new QueryString('?size=1');
  expect(queryString.getSize()).toBe("1");
});

it('indexof', () => {
  let queryString = new QueryString('?size=1&sort=name,desc');
  expect(queryString.indexOfSortDirection('name')).toBe(0);
  expect(queryString.indexOfSortDirection('namenotfound')).toBe(null);
});

it('setDirection', () => {
  let queryString = new QueryString('?size=1&sort=name,desc');
  queryString.setSortDirection('name', 'asc');
  expect(queryString.toString()).toBe('?size=1&sort=name,asc');
});

it('removeSortDirection', () => {
  let queryString = new QueryString('?size=1&sort=name,desc');
  queryString.removeSortDirection('name');
  expect(queryString.toString()).toBe('?size=1');
});