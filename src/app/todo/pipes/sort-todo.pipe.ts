import { Pipe, PipeTransform } from '@angular/core';
import { TodoItemType } from '../models/todo-item.model';
import { FilterOrderType, FilterType } from '../models/filter-todo.model';

@Pipe({
  name: 'sortTodo',
})
export class SortTodoPipe implements PipeTransform {
  transform(value: TodoItemType[] | null, order: FilterOrderType, filter: FilterType = 'title'): TodoItemType[] {
    if (value === null) {
      return [];
    }
    if (filter === 'date') {
      return this.sort(value, order, 'start');
    }
    return this.sort(value, order);
  }

  sort(value: TodoItemType[], order: FilterOrderType, filter: keyof Pick<TodoItemType, 'title' | 'start'> = 'title') {
    if (order === 'ascend') {
      return value.sort((a, b) => a[filter].toString().localeCompare(b[filter].toString()));
    } else {
      return value.sort((a, b) => -1 * a[filter].toString().localeCompare(b[filter].toString()));
    }
  }
}
