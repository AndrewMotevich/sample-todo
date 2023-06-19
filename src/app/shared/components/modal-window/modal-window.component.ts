import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [CommonModule, NzModalModule, NzButtonModule],
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWindowComponent {
  @Input() title = 'Modal window';

  public isVisible = false;
  public isOkLoading = false;

  constructor(private detectionStrategy: ChangeDetectorRef) {}

  public showModal(): void {
    this.isVisible = true;
    this.detectionStrategy.detectChanges();
  }

  public handleCancel(): void {
    this.isVisible = false;
    this.detectionStrategy.detectChanges();
  }
}
