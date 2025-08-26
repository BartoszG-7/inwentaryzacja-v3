import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';

// Apply persisted theme (sessionStorage) before bootstrapping to avoid FOUC
try {
  const savedTheme = sessionStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('theme-light');
  } else if (savedTheme === 'dark') {
    document.body.classList.remove('theme-light');
  }
} catch {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch((err) => console.error(err));


