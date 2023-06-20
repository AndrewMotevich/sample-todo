import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);

  public getUser() {
    return this.auth.currentUser;
  }

  public signOut() {
    signOut(this.auth);
  }
}
