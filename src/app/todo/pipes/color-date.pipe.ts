import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorDate',
})
export class ColorDatePipe implements PipeTransform {
  transform(value: number): string {
    const millisecondsInHour = 3600000;

    if (value > Date.now() - millisecondsInHour * 24) return 'green';
    else if (value > Date.now() - millisecondsInHour * 48) return 'blue';
    else return 'red';
  }
}
