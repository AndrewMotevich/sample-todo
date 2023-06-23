import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CollectionNameType } from 'src/app/shared/models/colection-name.model';

@Directive({
  selector: '[appTodoItemColor]',
})
export class TodoItemColorDirective implements OnInit {
  @Input() appTodoItemColor: CollectionNameType = 'todo';

  private todo = 'rgba(0, 0, 255, 0.1)';
  private inProgress = 'rgba(255, 255, 0, 0.1)';
  private done = 'rgba(0, 255, 0, 0.1)';

  constructor(private elem: ElementRef) {}
  ngOnInit(): void {
    this.changeColor();
  }

  changeColor() {
    if (this.appTodoItemColor) {
      switch (this.appTodoItemColor) {
        case 'done':
          this.elem.nativeElement.style.background = this.todo;
          break;
        case 'inProgress':
          this.elem.nativeElement.style.background = this.inProgress;
          break;
        case 'todo':
          this.elem.nativeElement.style.background = this.done;
          break;
      }
    }
  }
}
