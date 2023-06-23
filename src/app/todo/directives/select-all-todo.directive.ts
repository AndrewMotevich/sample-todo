import { Directive, Input, OnChanges } from '@angular/core';
import { CollectionNameType } from 'src/app/shared/models/colection-name.model';

@Directive({
  selector: '[appSelectAll]',
})
export class SelectAllTodoDirective implements OnChanges {
  @Input() appSelectAll!: boolean;
  @Input() collectionName!: CollectionNameType;

  ngOnChanges() {
    this.selectItem();
  }

  selectItem() {
    switch (this.collectionName) {
      case 'todo':
        if (this.appSelectAll) {
          document.querySelectorAll('nz-card').forEach((elem) => {
            if (elem.attributes.getNamedItem('ng-reflect-app-todo-item-color')?.value === this.collectionName) {
              elem.classList.add('outline');
            }
          });
        } else {
          document.querySelectorAll('nz-card').forEach((elem) => {
            if (elem.attributes.getNamedItem('ng-reflect-app-todo-item-color')?.value === this.collectionName) {
              elem.classList.remove('outline');
            }
          });
        }
        break;
      case 'inProgress':
        if (this.appSelectAll) {
          document.querySelectorAll('nz-card').forEach((elem) => {
            if (elem.attributes.getNamedItem('ng-reflect-app-todo-item-color')?.value === this.collectionName) {
              elem.classList.add('outline');
            }
          });
        } else {
          document.querySelectorAll('nz-card').forEach((elem) => {
            if (elem.attributes.getNamedItem('ng-reflect-app-todo-item-color')?.value === this.collectionName) {
              elem.classList.remove('outline');
            }
          });
        }
        break;
      case 'done':
        if (this.appSelectAll) {
          document.querySelectorAll('nz-card').forEach((elem) => {
            if (elem.attributes.getNamedItem('ng-reflect-app-todo-item-color')?.value === this.collectionName) {
              elem.classList.add('outline');
            }
          });
        } else {
          document.querySelectorAll('nz-card').forEach((elem) => {
            if (elem.attributes.getNamedItem('ng-reflect-app-todo-item-color')?.value === this.collectionName) {
              elem.classList.remove('outline');
            }
          });
        }
        break;
    }
  }
}
