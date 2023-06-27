import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CollectionName } from 'src/app/shared/models/colection-name.model';

@Directive({
  selector: '[appTodoItemColor]',
})
export class TodoItemColorDirective implements OnInit {
  @Input() appTodoItemColor!: CollectionName;

  constructor(private elem: ElementRef) {}

  ngOnInit(): void {
    this.changeColor();
  }

  changeColor() {
    if (!this.appTodoItemColor) {
      return;
    } else if (this.appTodoItemColor.toString() === 'todo') {
      this.elem.nativeElement.style.background = 'rgba(0, 0, 255, 0.1)';
    } else if (this.appTodoItemColor.toString() === 'inProgress') {
      this.elem.nativeElement.style.background = 'rgba(255, 255, 0, 0.1)';
    } else if (this.appTodoItemColor.toString() === 'done') {
      this.elem.nativeElement.style.background = 'rgba(0, 255, 0, 0.1)';
    }
  }
}
