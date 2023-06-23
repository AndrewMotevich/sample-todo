import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { BoardPageRoutingModule } from './board-page-routing.module';
import { BoardPageComponent } from './board-page.component';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { TodoCreateComponent } from '../../components/todo-create/todo-create.component';
import { ModalWindowComponent } from 'src/app/shared/components/modal-window/modal-window.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoDetailsComponent } from '../../components/todo-details/todo-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorDatePipe } from '../../pipes/color-date.pipe';
import { SortTodoPipe } from '../../pipes/sort-todo.pipe';
import { TodoItemColorDirective } from '../../directives/todo-item-color.directive';

@NgModule({
  declarations: [
    BoardPageComponent,
    TodoItemComponent,
    TodoCreateComponent,
    TodoDetailsComponent,
    ColorDatePipe,
    SortTodoPipe,
    TodoItemColorDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCardModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzTypographyModule,
    NzDividerModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzSpinModule,
    BoardPageRoutingModule,
    ModalWindowComponent,
    DragDropModule,
  ],
  exports: [BoardPageComponent, TodoItemComponent, ModalWindowComponent, TodoDetailsComponent],
})
export class BoardPageModule {}
