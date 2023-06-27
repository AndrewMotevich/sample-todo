import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from 'src/app/todo/models/filter-todo.model';

@Injectable({
  providedIn: 'root',
})
export class SortOptionService {
  private sortOption = new BehaviorSubject<Filter>(Filter.title);

  setSortOptions(filter: Filter) {
    this.sortOption.next(filter);
  }

  getSortOptions(): Observable<Filter> {
    return this.sortOption;
  }
}
