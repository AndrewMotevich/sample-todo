import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter, FilterOrder, IFilterInfoObject } from 'src/app/todo/models/filter-todo.model';

@Injectable({
  providedIn: 'root',
})
export class SortOptionService {
  private filterObserver = new BehaviorSubject<Filter>(Filter.title);

  public sortAllTodo: IFilterInfoObject = { filter: Filter.title, order: FilterOrder.ascend };
  public sortAllInProgress: IFilterInfoObject = { filter: Filter.title, order: FilterOrder.ascend };
  public sortAllDone: IFilterInfoObject = { filter: Filter.title, order: FilterOrder.ascend };

  public setSortOptions(filter: Filter) {
    this.filterObserver.next(filter);
  }

  public getSortOptions(): Observable<Filter> {
    return this.filterObserver;
  }

  public changeFilterOrder(collectionSortOptions: IFilterInfoObject): void {
    if (collectionSortOptions.order.toString() === 'ascend') collectionSortOptions.order = FilterOrder.descend;
    else collectionSortOptions.order = FilterOrder.ascend;
  }

  public changeFilter(filter: Filter): void {
    this.sortAllDone.filter = filter;
    this.sortAllInProgress.filter = filter;
    this.sortAllTodo.filter = filter;
  }
}
