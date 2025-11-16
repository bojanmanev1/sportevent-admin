import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { firebaseProviders } from './app/firebase.config';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideRouter(routes),
    ...firebaseProviders
  ]
}).catch(err => console.error(err));
