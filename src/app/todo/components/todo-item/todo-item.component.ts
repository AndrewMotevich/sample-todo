import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITodoItem } from '../../models/todo-item.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { CollectionName } from 'src/app/shared/enum/collection-name';
import { BoardPageComponent } from '../../pages/board-page/board-page.component';
import { unselectAll } from '../../utils/utils';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todoItem!: ITodoItem;
  @Input() collectionName!: CollectionName;
  @Input() checkAll!: boolean;

  constructor(
    private firestoreService: FirestoreService,
    private component: BoardPageComponent
  ) {}

  public deleteItem(event: Event, id: string) {
    event.stopPropagation();
    this.firestoreService.deleteTodo(this.collectionName, id);
  }

  public selectItem() {
    if (this.todoItem.selected) {
      this.todoItem.selected = false;
      unselectAll(this.collectionName, this.component);
    } else {
      this.todoItem.selected = true;
    }
  }
}
