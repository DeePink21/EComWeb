import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { TokenInterceptor } from './interceptors/token.interceptor';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage} from 'ngx-webstorage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    provideNgxWebstorage(
			withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
			withLocalStorage(),
			withSessionStorage()
		)
  ],
};

