import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { TodoItemType } from '../../models/todo-item.model';
import { Observable, BehaviorSubject } from 'rxjs';
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
  public inputValue!: string | null;
  public checkAllTodo = false;
  public checkAllInProgress = false;
  public checkAllDone = false;

  public sortAllTodo: FilterInfoObject = { filter: 'title', order: 'ascend' };
  public sortAllInProgress: FilterInfoObject = { filter: 'title', order: 'ascend' };
  public sortAllDone: FilterInfoObject = { filter: 'title', order: 'ascend' };

  public todo: BehaviorSubject<TodoItemType[]> = this.firestoreService.getTodoCollection();
  public inProgress: Observable<TodoItemType[]> = this.firestoreService.getInProgressCollection();
  public done: Observable<TodoItemType[]> = this.firestoreService.getDoneCollection();

  constructor(private firestoreService: FirestoreService, public sortOptionService: SortOptionService) {
    this.firestoreService.boardMainInputValue.subscribe((res) => {
      this.inputValue = res;
    });
    this.sortOptionService.getSortOptions().subscribe((res) => this.changeFilter(res));
  }

  todoAction(
    action: ActionsTodoType,
    collectionName: CollectionNameType,
    moveToCollectionName: CollectionNameType = 'todo'
  ) {
    switch (collectionName) {
      case 'todo':
        this.todo.subscribe((res) => {
          action === 'selectAll' &&
            res.forEach((todo) => {
              todo.selected = this.checkAllTodo;
            });
          action === 'moveSelected' &&
            (() => {
              for (let i = 0; i < res.length; i++) {
                if (res[i].selected) {
                  this.firestoreService.runDragAndDrop(collectionName, moveToCollectionName, res[i]);
                }
              }
              this.checkAllTodo = false;
              this.todoAction('selectAll', collectionName);
            })();
          action === 'deleteSelected' &&
            res.forEach((todo) => {
              if (todo.selected) this.firestoreService.deleteTodo(collectionName, todo.id || '');
              this.checkAllTodo = false;
              this.todoAction('selectAll', collectionName);
            });
        }).unsubscribe;
        break;
      case 'inProgress':
        this.inProgress
          .subscribe((res) => {
            action === 'selectAll' && res.forEach((todo) => (todo.selected = this.checkAllInProgress));
            action === 'moveSelected' &&
              (() => {
                for (let i = 0; i < res.length; i++) {
                  if (res[i].selected) {
                    this.firestoreService.runDragAndDrop(collectionName, moveToCollectionName, res[i]);
                  }
                }
                this.checkAllInProgress = false;
                this.todoAction('selectAll', collectionName);
              })();
            action === 'deleteSelected' &&
              res.forEach((todo) => {
                if (todo.selected) this.firestoreService.deleteTodo(collectionName, todo.id || '');
                this.checkAllInProgress = false;
                this.todoAction('selectAll', collectionName);
              });
          })
          .unsubscribe();
        break;
      case 'done':
        this.done
          .subscribe((res) => {
            action === 'selectAll' && res.forEach((todo) => (todo.selected = this.checkAllDone));
            action === 'moveSelected' &&
              (() => {
                for (let i = 0; i < res.length; i++) {
                  if (res[i].selected) {
                    this.firestoreService.runDragAndDrop(collectionName, moveToCollectionName, res[i]);
                  }
                }
                this.checkAllDone = false;
                this.todoAction('selectAll', collectionName);
              })();
            action === 'deleteSelected' &&
              res.forEach((todo) => {
                if (todo.selected) this.firestoreService.deleteTodo(collectionName, todo.id || '');
                this.checkAllDone = false;
                this.todoAction('selectAll', collectionName);
              });
          })
          .unsubscribe();
        break;
    }
  }

  checkTodo(collectionName: CollectionNameType, item: TodoItemType) {
    if (collectionName === 'done') this.firestoreService.runDragAndDrop(collectionName, 'todo', item);
    else {
      this.firestoreService.runDragAndDrop(collectionName, 'done', item);
    }
  }

  unselectAllCheck(collectionName: CollectionNameType) {
    collectionName === 'todo' && (this.checkAllTodo = false);
    collectionName === 'inProgress' && (this.checkAllInProgress = false);
    collectionName === 'done' && (this.checkAllDone = false);
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
