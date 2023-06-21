import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { TodoItemType } from '../../models/todo-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent {
  public todo: Observable<TodoItemType[]> = this.firestoreService.getTodoCollection();
  public inProgress: Observable<TodoItemType[]> = this.firestoreService.getInProgressCollection();
  public done: Observable<TodoItemType[]> = this.firestoreService.getDoneCollection();

  constructor(private firestoreService: FirestoreService) {}
}
