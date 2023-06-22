import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorDate',
})
export class ColorDatePipe implements PipeTransform {
  transform(value: number): string {
    if (value > Date.now() - 3600000 * 24) return 'green';
    if (value > Date.now() - 3600000 * 24 * 2) return 'blue';
    else return 'red';
  }
}
