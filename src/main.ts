import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { firebaseProviders } from './app/firebase.config';
import { MAT_DATE_LOCALE } from '@angular/material/core';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideRouter(routes),
    ...firebaseProviders,
    { provide: MAT_DATE_LOCALE, useValue: 'mk-MK' },
  ]
}).catch(err => console.error(err));
