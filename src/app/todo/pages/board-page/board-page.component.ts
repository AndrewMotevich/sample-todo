import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ITodoItem } from '../../models/todo-item.model';
import { BehaviorSubject } from 'rxjs';
import { CollectionName } from 'src/app/shared/models/colection-name.model';
import { IFilterInfoObject, Filter, FilterOrder } from '../../models/filter-todo.model';
import { ActionsTodoType } from '../../models/action-todo.model';
import { SortOptionService } from 'src/app/core/services/sort-option.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent {
  public collectionName = CollectionName;

  public checkAllTodo = false;
  public checkAllInProgress = false;
  public checkAllDone = false;

  public sortAllTodo: IFilterInfoObject = { filter: Filter.title, order: FilterOrder.ascend };
  public sortAllInProgress: IFilterInfoObject = { filter: Filter.title, order: FilterOrder.ascend };
  public sortAllDone: IFilterInfoObject = { filter: Filter.title, order: FilterOrder.ascend };

  public todo: BehaviorSubject<ITodoItem[]> = this.firestoreService.getTodoCollection();
  public inProgress: BehaviorSubject<ITodoItem[]> = this.firestoreService.getInProgressCollection();
  public done: BehaviorSubject<ITodoItem[]> = this.firestoreService.getDoneCollection();

  constructor(private firestoreService: FirestoreService, public sortOptionService: SortOptionService) {
    this.sortOptionService.getSortOptions().subscribe((res) => this.changeFilter(res));
  }

  public doActionWithTodo(
    collection: BehaviorSubject<ITodoItem[]>,
    checkAll: boolean,
    action: ActionsTodoType,
    collectionName: CollectionName,
    moveToCollectionName: CollectionName = CollectionName.todo
  ) {
    collection.subscribe((res) => {
      action === 'selectAll' &&
        res.forEach((todo) => {
          todo.selected = checkAll;
        });
      action === 'moveSelected' &&
        (() => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].selected) {
              this.firestoreService.runDragAndDrop(collectionName, moveToCollectionName, res[i]);
            }
          }
          checkAll = false;
          this.doActionWithTodo(collection, checkAll, 'selectAll', collectionName);
        })();
      action === 'deleteSelected' &&
        res.forEach((todo) => {
          if (todo.selected) this.firestoreService.deleteTodo(collectionName, todo.id || '');
          checkAll = false;
          this.doActionWithTodo(collection, checkAll, 'selectAll', collectionName);
        });
    }).unsubscribe;
  }

  public checkTodo(collectionName: CollectionName, item: ITodoItem) {
    if (collectionName.toString() === 'done')
      this.firestoreService.runDragAndDrop(collectionName, CollectionName.todo, item);
    else {
      this.firestoreService.runDragAndDrop(collectionName, CollectionName.done, item);
    }
  }

  public changeFilterOrder(collectionSortOptions: IFilterInfoObject): void {
    if (collectionSortOptions.order.toString() === 'ascend') collectionSortOptions.order = FilterOrder.descend;
    else collectionSortOptions.order = FilterOrder.ascend;
  }

  private changeFilter(filter: Filter): void {
    this.sortAllDone.filter = filter;
    this.sortAllInProgress.filter = filter;
    this.sortAllTodo.filter = filter;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    const previousContainerId = this.getCollectionNameFromString(event.previousContainer.id);
    const currentContainerId = this.getCollectionNameFromString(event.container.id);
    this.firestoreService.runDragAndDrop(previousContainerId, currentContainerId, item);
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }

  private getCollectionNameFromString(query: string) {
    if (query === 'todo') return CollectionName.todo;
    if (query === 'inProgress') return CollectionName.inProgress;
    if (query === 'done') return CollectionName.done;
    return CollectionName.todo;
  }
}
