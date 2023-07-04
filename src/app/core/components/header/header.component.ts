import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
} from '@angular/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import {
  HeaderMenuComponent,
  MobileMenuComponent,
} from '../header-menu/header-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzMenuModule,
    NzSwitchModule,
    CommonModule,
    AppRoutingModule,
    TranslateModule,
    FormsModule,
    HeaderMenuComponent,
    MobileMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  currentUrl = 'Authentication';
  isMobile = false;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        event.url === '/' && (this.currentUrl = 'HEADER.TITLE.AUTH');
        event.url === '/board' && (this.currentUrl = 'HEADER.TITLE.BOARD');
        event.url === '/about' && (this.currentUrl = 'HEADER.TITLE.ABOUT');
        this.changeDetection.detectChanges();
      }
    });
    if (document.body.clientWidth < 600) {
      this.isMobile = true;
    }
  }
}
