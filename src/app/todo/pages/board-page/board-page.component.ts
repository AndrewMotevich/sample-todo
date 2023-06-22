import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { TodoItemType } from '../../models/todo-item.model';
import { Observable } from 'rxjs';
import { CollectionNameType } from 'src/app/shared/models/colection-name.model';
import { FilterInfoObject } from '../../models/filter-todo.model';

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

  public todo: Observable<TodoItemType[]> = this.firestoreService.getTodoCollection().pipe();
  public inProgress: Observable<TodoItemType[]> = this.firestoreService.getInProgressCollection();
  public done: Observable<TodoItemType[]> = this.firestoreService.getDoneCollection();

  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.boardMainInputValue.subscribe((res) => {
      this.inputValue = res;
    });
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

  changeFilter(collectionName: CollectionNameType): void {
    switch (collectionName) {
      case 'done':
        if (this.sortAllDone.filter === 'date') this.sortAllDone.filter = 'title';
        else this.sortAllDone.filter = 'date';
        break;
      case 'inProgress':
        if (this.sortAllInProgress.filter === 'date') this.sortAllInProgress.filter = 'title';
        else this.sortAllInProgress.filter = 'date';
        break;
      case 'todo':
        if (this.sortAllTodo.filter === 'date') this.sortAllTodo.filter = 'title';
        else this.sortAllTodo.filter = 'date';
        break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drop(event: CdkDragDrop<any>): void {
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
