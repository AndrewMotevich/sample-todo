import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoItemType } from '../../models/todo-item.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { CollectionNameType } from 'src/app/shared/models/colection-name.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailsComponent {
  @Input() todo!: TodoItemType;
  @Input() collectionName!: CollectionNameType;

  constructor(private firestoreService: FirestoreService) {}

  editTodo() {
    this.firestoreService.editTodo(this.collectionName, this.todo);
  }

  deleteTodo() {
    this.firestoreService.deleteTodo(this.collectionName, this.todo.id || '');
  }
}
