import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ModalWindowComponent } from '../shared/components/modal-window/modal-window.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

@NgModule({
  declarations: [LoginComponent, SignInComponent],
  imports: [CommonModule, ModalWindowComponent],
  exports: [LoginComponent, SignInComponent],
})
export class AuthModule {}
