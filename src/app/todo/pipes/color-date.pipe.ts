import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorDate',
})
export class ColorDatePipe implements PipeTransform {
  transform(value: number): string {
    if (value > Date.now() - 3600 * 24) return 'green';
    if (value > Date.now() - 3600 * 24 * 7) return 'blue';
    else return 'red';
  }
}
