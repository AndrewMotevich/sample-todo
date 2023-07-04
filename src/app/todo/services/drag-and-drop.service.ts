import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DragAndDropService {
  private disableDrag = false;
  public disableDragObserver = new BehaviorSubject<boolean>(false);

  switchDisableDrag() {
    this.disableDrag = !this.disableDrag;
    this.disableDragObserver.next(this.disableDrag);
  }

  getDisableDragObserver() {
    return this.disableDragObserver;
  }
}
