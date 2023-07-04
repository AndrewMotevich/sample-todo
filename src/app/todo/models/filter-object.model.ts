import { Filter, FilterOrder } from '../enum/filter-todo.model';

export interface IFilterInfoObject {
  order: FilterOrder;
  filter: Filter;
}
