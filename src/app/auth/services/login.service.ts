import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isLoggedIn = false;
  public userEmail = new BehaviorSubject<string>('');

  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);

  constructor(
    private router: Router,
    private notification: NzNotificationService
  ) {
    onAuthStateChanged(
      this.auth,
      user => {
        if (user?.email) {
          this.isLoggedIn = true;
          this.userEmail.next(user.email);
          this.router.navigate(['board']);
        } else {
          this.isLoggedIn = false;
          this.router.navigate(['/']);
        }
      },
      err => {
        this.notification.create('error', 'Auth Observer', err.message);
      }
    );
  }

  public getUser(): User | null {
    return this.auth.currentUser;
  }

  public signOut(): void {
    this.isLoggedIn = false;
    signOut(this.auth).catch((err: Error) => {
      this.notification.create('error', 'Sign Out', err.message);
    });
  }
}
