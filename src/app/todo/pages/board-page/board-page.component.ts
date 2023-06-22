import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { TodoItemType } from '../../models/todo-item.model';
import { Observable } from 'rxjs';
import { CollectionNameType } from 'src/app/shared/models/colection-name.model';

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

  public todo: Observable<TodoItemType[]> = this.firestoreService.getTodoCollection();
  public inProgress: Observable<TodoItemType[]> = this.firestoreService.getInProgressCollection();
  public done: Observable<TodoItemType[]> = this.firestoreService.getDoneCollection();

  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.boardMainInputValue.subscribe((res) => {
      this.inputValue = res;
    });
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
