// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;

  constructor(private auth: Auth) {
    // track auth state
    onAuthStateChanged(this.auth, user => {
      this.currentUser = user;
    });
  }

  // sign in with email/password
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // sign out
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // convenience helper to get current user as Observable if needed
  getUser(): Observable<User | null> {
    return of(this.currentUser);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
