import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { TodoItemType } from '../../models/todo-item.model';
import { BehaviorSubject } from 'rxjs';
import { CollectionNameType } from 'src/app/shared/models/colection-name.model';
import { FilterInfoObject, FilterType } from '../../models/filter-todo.model';
import { ActionsTodoType } from '../../models/action-todo.model';
import { SortOptionService } from 'src/app/core/services/sort-option.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent {
  public checkAllTodo = false;
  public checkAllInProgress = false;
  public checkAllDone = false;

  public sortAllTodo: FilterInfoObject = { filter: 'title', order: 'ascend' };
  public sortAllInProgress: FilterInfoObject = { filter: 'title', order: 'ascend' };
  public sortAllDone: FilterInfoObject = { filter: 'title', order: 'ascend' };

  public todo: BehaviorSubject<TodoItemType[]> = this.firestoreService.getTodoCollection();
  public inProgress: BehaviorSubject<TodoItemType[]> = this.firestoreService.getInProgressCollection();
  public done: BehaviorSubject<TodoItemType[]> = this.firestoreService.getDoneCollection();

  constructor(private firestoreService: FirestoreService, public sortOptionService: SortOptionService) {
    this.sortOptionService.getSortOptions().subscribe((res) => this.changeFilter(res));
  }

  doActionWithTodo(
    collection: BehaviorSubject<TodoItemType[]>,
    checkAll: boolean,
    action: ActionsTodoType,
    collectionName: CollectionNameType,
    moveToCollectionName: CollectionNameType = 'todo'
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

  checkTodo(collectionName: CollectionNameType, item: TodoItemType) {
    if (collectionName === 'done') this.firestoreService.runDragAndDrop(collectionName, 'todo', item);
    else {
      this.firestoreService.runDragAndDrop(collectionName, 'done', item);
    }
  }

  changeFilterOrder(collectionName: CollectionNameType): void {
    switch (collectionName) {
      case 'done':
        if (this.sortAllDone.order === 'ascend') this.sortAllDone.order = 'descend';
        else this.sortAllDone.order = 'ascend';
        break;
      case 'inProgress':
        if (this.sortAllInProgress.order === 'ascend') this.sortAllInProgress.order = 'descend';
        else this.sortAllInProgress.order = 'ascend';
        break;
      case 'todo':
        if (this.sortAllTodo.order === 'ascend') this.sortAllTodo.order = 'descend';
        else this.sortAllTodo.order = 'ascend';
        break;
    }
  }

  changeFilter(filter: FilterType): void {
    this.sortAllDone.filter = filter;
    this.sortAllInProgress.filter = filter;
    this.sortAllTodo.filter = filter;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.firestoreService.runDragAndDrop(
      event.previousContainer.id as CollectionNameType,
      event.container.id as CollectionNameType,
      item
    );
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }
}
