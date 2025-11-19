// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {
  path: 'registrations',
  canActivate: [authGuard],
  loadComponent: () => import('./pages/registrations/registrations.component')
    .then(c => c.RegistrationsComponent)
},
{ path: '**', redirectTo: 'login' }
];
