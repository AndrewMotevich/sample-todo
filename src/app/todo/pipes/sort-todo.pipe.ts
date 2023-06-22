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
      return sortByDate(value, order);
    }
    return sortByTitle(value, order);
  }
}

function sortByTitle(value: TodoItemType[], order: FilterOrderType) {
  switch (order) {
    case 'ascend':
      return value.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    case 'descend':
      return value.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
  }
}

function sortByDate(value: TodoItemType[], order: FilterOrderType) {
  switch (order) {
    case 'ascend':
      return value.sort((a, b) => {
        if (a.start < b.start) {
          return -1;
        }
        if (a.start > b.start) {
          return 1;
        }
        return 0;
      });
    case 'descend':
      return value.sort((a, b) => {
        if (a.start > b.start) {
          return -1;
        }
        if (a.start < b.start) {
          return 1;
        }
        return 0;
      });
  }
}
