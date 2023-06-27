import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { TodoItemType } from '../../models/todo-item.model';
import { BehaviorSubject } from 'rxjs';
import { CollectionName } from 'src/app/shared/models/colection-name.model';
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
  public collectionName = CollectionName;

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

  checkTodo(collectionName: CollectionName, item: TodoItemType) {
    if (collectionName.toString() === 'done')
      this.firestoreService.runDragAndDrop(collectionName, CollectionName.todo, item);
    else {
      this.firestoreService.runDragAndDrop(collectionName, CollectionName.done, item);
    }
  }

  changeFilterOrder(collectionName: CollectionName): void {
    switch (collectionName.toString()) {
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
    const previousContainerId = getCollectionName(event.previousContainer.id);
    const currentContainerId = getCollectionName(event.container.id);
    this.firestoreService.runDragAndDrop(previousContainerId, currentContainerId, item);
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }
}

function getCollectionName(query: string) {
  if (query === 'todo') return CollectionName.todo;
  if (query === 'inProgress') return CollectionName.inProgress;
  if (query === 'done') return CollectionName.done;
  return CollectionName.todo;
}
