import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TodoItemType } from '../models/todo-item.model';

@Directive({
  selector: '[appSelectTodoItem]',
})
export class SelectTodoItemDirective {
  @HostListener('click') onClick() {
    this.selectItem();
  }
  @Input() appSelectTodoItem!: TodoItemType;

  constructor(private elem: ElementRef) {}

  selectItem() {
    if (this.appSelectTodoItem.selected) {
      this.appSelectTodoItem.selected = false;
      this.elem.nativeElement.classList.remove('outline');
    } else {
      this.appSelectTodoItem.selected = true;
      this.elem.nativeElement.classList.add('outline');
    }
  }
}
