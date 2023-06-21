import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);
  public userEmail = new BehaviorSubject<string>('');

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.userEmail.next(user?.email || '');
    });
  }

  public getUser(): User | null {
    return this.auth.currentUser;
  }

  public signOut(): void {
    signOut(this.auth);
  }
}
