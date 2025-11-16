// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = auth.currentUser;
  if (user) {
    return true;
  } else {
    // if not signed in, redirect to login
    router.navigate(['/login']);
    return false;
  }
};
