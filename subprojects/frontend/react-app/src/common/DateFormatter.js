// @flow

import {DateTime} from "luxon"

/**
 * Formats a given date/time string to a standard format (yyyy-MM-dd HH:mm:ss ZZ).
 * If an 'altZone' is specified then the zone is changed to that.
 * Otherwise, the zone is changed to the local zone before formatting to string.
 */
export default class DateFormatter {

  value: string;
  altZone: string;
  output: string = null;

  constructor(value: string, altZone: string) {
    this.value = value;
    this.altZone = altZone;
  }

  toString = () => {
    if (this.output == null) {
      let dateTime = DateTime.fromISO(this.value);
      if (this.altZone) {
        dateTime = dateTime.setZone(this.altZone);
      } else {
        dateTime = dateTime.toLocal();
      }
      this.output = dateTime.toFormat('yyyy-MM-dd HH:mm:ss ZZ');
    }
    return this.output;
  }
}