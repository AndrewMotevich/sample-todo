import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoItemType } from '../../models/todo-item.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { CollectionNameType } from 'src/app/shared/models/colection-name.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todoItem!: TodoItemType;
  @Input() collectionArray!: TodoItemType[];
  @Input() collectionName!: CollectionNameType;

  constructor(private firestoreService: FirestoreService) {}

  public deleteItem(event: Event, id: string) {
    event.stopPropagation();
    this.firestoreService.deleteTodo(this.collectionName, id);
  }
}
