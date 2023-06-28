import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ITodoItem } from '../../models/todo-item.model';
import { BehaviorSubject } from 'rxjs';
import { CollectionName } from 'src/app/shared/models/colection-name.model';
import { IFilterInfoObject } from '../../models/filter-todo.model';
import { ActionsTodo } from '../../models/action-todo.model';
import { SortOptionService } from 'src/app/todo/services/sort-option.service';
import { getCollectionNameFromString, unselectAll } from '../../utils/utils';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent {
  public collectionName = CollectionName;
  public action = ActionsTodo;

  public checkAllTodo = false;
  public checkAllInProgress = false;
  public checkAllDone = false;

  public todo: BehaviorSubject<ITodoItem[]> = this.firestoreService.getTodoCollection();
  public inProgress: BehaviorSubject<ITodoItem[]> = this.firestoreService.getInProgressCollection();
  public done: BehaviorSubject<ITodoItem[]> = this.firestoreService.getDoneCollection();

  constructor(private firestoreService: FirestoreService, public sortOptionService: SortOptionService) {
    this.sortOptionService.getSortOptions().subscribe((res) => this.sortOptionService.changeFilter(res));
  }

  public doActionWithTodo(
    collection: BehaviorSubject<ITodoItem[]>,
    checkAll: boolean,
    action: ActionsTodo,
    collectionName: CollectionName,
    moveToCollectionName: CollectionName = CollectionName.todo
  ) {
    collection
      .subscribe((res) => {
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
            unselectAll(collectionName, this);
          })();
        action === 'deleteSelected' &&
          (() => {
            res.forEach((todo) => {
              if (todo.selected) this.firestoreService.deleteTodo(collectionName, todo.id || '');
            });
            unselectAll(collectionName, this);
          })();
      })
      .unsubscribe();
  }

  public checkTodo(collectionName: CollectionName, item: ITodoItem) {
    if (collectionName.toString() === 'done')
      this.firestoreService.runDragAndDrop(collectionName, CollectionName.todo, item);
    else {
      this.firestoreService.runDragAndDrop(collectionName, CollectionName.done, item);
    }
  }

  public changeFilterOrder(collectionSortOptions: IFilterInfoObject): void {
    this.sortOptionService.changeFilterOrder(collectionSortOptions);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    const previousContainerId = getCollectionNameFromString(event.previousContainer.id);
    const currentContainerId = getCollectionNameFromString(event.container.id);
    this.firestoreService.runDragAndDrop(previousContainerId, currentContainerId, item);
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }
}
