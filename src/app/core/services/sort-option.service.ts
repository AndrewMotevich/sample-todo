import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterType } from 'src/app/todo/models/filter-todo.model';

@Injectable({
  providedIn: 'root',
})
export class SortOptionService {
  private _sortOption = new BehaviorSubject<FilterType>('title');

  setSortOptions(filter: FilterType) {
    this._sortOption.next(filter);
  }

  getSortOptions(): Observable<FilterType> {
    return this._sortOption;
  }
}
