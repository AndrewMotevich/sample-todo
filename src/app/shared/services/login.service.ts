import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);
  public userEmail = new BehaviorSubject<string>('');

  constructor(private router: Router, private notification: NzNotificationService) {
    onAuthStateChanged(
      this.auth,
      (user) => {
        if (user?.email) {
          this.userEmail.next(user?.email || '');
          this.router.navigate(['/board']);
        } else if (user === null) {
          this.router.navigate(['/']);
        }
      },
      (err) => {
        this.notification.create('error', 'Auth Observer', err.message);
      }
    );
  }

  public getUser(): User | null {
    return this.auth.currentUser;
  }

  public signOut(): void {
    signOut(this.auth).catch((err: Error) => {
      this.notification.create('error', 'Sign Out', err.message);
    });
  }
}
