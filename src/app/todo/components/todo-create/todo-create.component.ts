import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoType } from '../../models/todo.model';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateComponent {
  @Input() todo!: TodoType;
}
