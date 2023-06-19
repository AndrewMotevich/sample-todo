import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Observable, delay } from 'rxjs';

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
  @Input() async = false;
  @Input() callback: (() => void) | (<T>() => Observable<T>) = () =>
    new Observable((sub) => {
      sub.next();
      sub.complete();
    }).pipe(delay(2000));

  public isVisible = false;
  public isOkLoading = false;

  constructor(private detectionStrategy: ChangeDetectorRef) {}

  public showModal(): void {
    this.isVisible = true;
    this.detectionStrategy.detectChanges();
  }

  protected handleOk(): void {
    if (this.async) {
      this.isOkLoading = true;
      (this.callback as <T>() => Observable<T>)().subscribe({
        complete: () => {
          this.isOkLoading = false;
          this.isVisible = false;
          this.detectionStrategy.detectChanges();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.callback();
      this.isVisible = false;
      this.detectionStrategy.detectChanges();
    }
  }

  public handleCancel(): void {
    this.isVisible = false;
  }
}
