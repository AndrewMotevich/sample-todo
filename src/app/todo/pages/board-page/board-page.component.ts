import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { TodoType } from '../../models/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent {
  public todo: Observable<TodoType[]> = this.firestoreService.getTodoCollection();
  public inProgress: Observable<TodoType[]> = this.firestoreService.getInProgressCollection();
  public done: Observable<TodoType[]> = this.firestoreService.getDoneCollection();

  constructor(private firestoreService: FirestoreService) {}
}
