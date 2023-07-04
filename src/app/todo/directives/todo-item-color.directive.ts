import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CollectionName } from 'src/app/shared/enum/collection-name';

@Directive({
  selector: '[appTodoItemColor]',
})
export class TodoItemColorDirective implements OnInit {
  @Input() appTodoItemColor!: CollectionName;

  private todoCollectionBackground = {
    todo: 'rgba(0, 0, 255, 0.1)',
    inProgress: 'rgba(255, 255, 0, 0.1)',
    done: 'rgba(0, 255, 0, 0.1)',
  };

  constructor(private elem: ElementRef) {}

  ngOnInit(): void {
    this.changeColor();
  }

  changeColor() {
    if (!this.appTodoItemColor) {
      return;
    }
    this.elem.nativeElement.style.background =
      this.todoCollectionBackground[this.appTodoItemColor];
  }
}
