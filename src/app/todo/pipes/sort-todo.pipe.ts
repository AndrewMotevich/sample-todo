import { Pipe, PipeTransform } from '@angular/core';
import { ITodoItem } from '../models/todo-item.model';
import { FilterOrder, Filter } from '../models/filter-todo.model';

@Pipe({
  name: 'sortTodo',
})
export class SortTodoPipe implements PipeTransform {
  transform(value: ITodoItem[] | null, order: FilterOrder, filter: Filter = Filter.title): ITodoItem[] {
    if (value === null) {
      return [];
    }
    if (filter.toString() === 'date') {
      return this.sort(value, order, 'start');
    }
    return this.sort(value, order);
  }

  sort(value: ITodoItem[], order: FilterOrder, filter: keyof Pick<ITodoItem, 'title' | 'start'> = 'title') {
    if (order.toString() === 'ascend') {
      return value.sort((a, b) => a[filter].toString().localeCompare(b[filter].toString()));
    } else {
      return value.sort((a, b) => -1 * a[filter].toString().localeCompare(b[filter].toString()));
    }
  }
}
