import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';

import { BoardPageRoutingModule } from './board-page-routing.module';
import { BoardPageComponent } from './board-page.component';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';

@NgModule({
  declarations: [BoardPageComponent, TodoItemComponent],
  imports: [CommonModule, NzCardModule, BoardPageRoutingModule],
  exports: [BoardPageComponent, TodoItemComponent],
})
export class BoardPageModule {}
