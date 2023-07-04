import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {}
