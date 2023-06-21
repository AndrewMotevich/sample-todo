import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';

import { BoardPageRoutingModule } from './board-page-routing.module';
import { BoardPageComponent } from './board-page.component';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { TodoCreateComponent } from '../../components/todo-create/todo-create.component';
import { ModalWindowComponent } from 'src/app/shared/components/modal-window/modal-window.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [BoardPageComponent, TodoItemComponent, TodoCreateComponent],
  imports: [CommonModule, NzCardModule, BoardPageRoutingModule, ModalWindowComponent, DragDropModule],
  exports: [BoardPageComponent, TodoItemComponent, ModalWindowComponent],
})
export class BoardPageModule {}
