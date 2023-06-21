import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoItemType } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todoItem!: TodoItemType;
}
