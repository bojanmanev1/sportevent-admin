// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { SelfRegistrations } from './pages/self-registrations/self-registrations';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
   { path: 'self-registrations',canActivate: [authGuard], component: SelfRegistrations },
  {
  path: 'registrations',
  canActivate: [authGuard],
  loadComponent: () => import('./pages/registrations/registrations.component')
    .then(c => c.RegistrationsComponent)
},

{ path: '**', redirectTo: 'login' }
];
