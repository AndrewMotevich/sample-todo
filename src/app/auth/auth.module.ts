import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ModalWindowComponent } from '../shared/components/modal-window/modal-window.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ModalWindowComponent],
  exports: [LoginComponent],
})
export class AuthModule {}
