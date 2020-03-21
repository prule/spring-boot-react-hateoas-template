// @flow

import queryString, {ParsedQuery} from 'query-string';

export default class QueryString {

  parsedQuery: ParsedQuery;

  constructor(query: string) {
    this.parsedQuery = queryString.parse(query);
    // init sort
    if (!this.parsedQuery.sort) {
      this.parsedQuery.sort = [];
    }
    // force sort to array
    if (!Array.isArray(this.parsedQuery.sort)) {
      this.parsedQuery.sort = [this.parsedQuery.sort];
    }
  }

  set(key: string, value: string) {
    this.parsedQuery[key] = value;
  }

  get(key: string, defaultValue: string) {
    return this.parsedQuery[key] ? this.parsedQuery[key] : defaultValue;
  }

  getSize(): number {
    return this.parsedQuery.size;
  }

  setSize(size: number) {
    this.parsedQuery.size = size;
  }

  setPage(page: number) {
    this.parsedQuery.page = page;
  }

  getSort(): [] {
    return this.parsedQuery.sort;
  }

  getSortDirection(id: string): string {
    const sort = this.getSort();
    for (let i = 0; i < sort.length; i++) {
      const value = sort[i];
      const values = value.split(',');
      if (values[0] === id) {
        return values[1];
      }
    }
    return null;
  }

  setSortDirection(id: string, direction: string): string {
    const sort = this.getSort();
    const newValue = id + ',' + direction;
    const index = this.indexOfSortDirection(id);
    if (index != null) {
      sort[index] = newValue;
    } else {
      sort.push(newValue);
    }
  }

  removeSortDirection(id: string) {
    const sort = this.getSort();
    const index = this.indexOfSortDirection(id);
    if (index != null) {
      console.log('before', sort);
      sort.splice(index, 1);
      console.log('after', this.parsedQuery.sort);
    }
  }

  indexOfSortDirection(id: string): string {
    const sort = this.getSort();
    console.log(sort);
    for (let i = 0; i < sort.length; i++) {
      const value = sort[i];
      const values = value.split(',');
      if (values[0] === id) {
        console.log('found index ', i);
        return i;
      }
    }
    return null;
  }

  isSorted(id: string): boolean {
    return !!this.getSortDirection(id);
  }

  toggleDirection(id: string) {
    const sortDirection = this.getSortDirection(id);
    if (sortDirection === 'asc') {
      this.setSortDirection(id, 'desc');
    } else if (sortDirection === 'desc') {
      this.removeSortDirection(id);
    } else {
      this.setSortDirection(id, 'asc');
    }
  }

  toString(): string {
    return '?' + queryString.stringify(this.parsedQuery, {encode: false});
  }
}