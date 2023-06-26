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
    if (this.appSelectAll) {
      document.querySelectorAll('nz-card').forEach((elem) => {
        if (elem.classList.contains(this.collectionName)) {
          elem.classList.add('outline');
        }
      });
    } else {
      document.querySelectorAll('nz-card').forEach((elem) => {
        if (elem.classList.contains(this.collectionName)) {
          elem.classList.remove('outline');
        }
      });
    }
  }
}
