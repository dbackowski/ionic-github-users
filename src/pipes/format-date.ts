import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDate implements PipeTransform {
  transform(value, args) {
    return moment(value).format('YYYY-MM-DD');
  }
}
