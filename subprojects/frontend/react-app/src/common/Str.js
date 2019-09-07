export default class Str {

  static join(array, sep) {
    if (array) {
      return array.filter((item) => !!item).join(sep ? sep : ' ');
    }
    else {
      return '';
    }
  }

  static formatDate(date) {
    if (date) {
      return date.toLocaleDateString("en-AU");
    }
    else {
      return '';
    }
  }

  static replaceTemplates(value, params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        value = value.replace('{'+key+'}', params[key]);
      }
    }
    return value;
  }

  static valueOrEmpty(value) {
    return value === null || value === undefined ? '' : value;
  }
}