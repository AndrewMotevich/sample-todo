import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoItemType } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateComponent {
  @Input() todo!: TodoItemType;
}
