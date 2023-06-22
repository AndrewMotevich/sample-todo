import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppRoutingModule } from '../app-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, NzPageHeaderModule, NzButtonModule, NzIconModule, NzMenuModule, AppRoutingModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
