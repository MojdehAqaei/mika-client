import {
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  importProvidersFrom,
  inject,
  provideZoneChangeDetection
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { appRoutes } from './app.routes';
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  HttpBackend,
  HttpClient,
  provideHttpClient,
  withInterceptors,
  withXsrfConfiguration
} from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ClTitleService } from "@sadad/component-lib/src/services";
import { HttpInterceptorProvider } from '@view/lib/interceptors';
import { APP_INITIALIZE } from './app.initializer';


/** i18n */
export function createTranslateLoader(http: HttpClient, handler: HttpBackend) {
  http = new HttpClient(handler); // bypassing the interceptors
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideRouter(
      appRoutes,
      withViewTransitions(), // experimental
      withRouterConfig({onSameUrlNavigation: 'reload'}),
      withInMemoryScrolling({}),
      withPreloading(PreloadAllModules),
      // withDebugTracing()
    ),
    provideAnimations(),
    provideHttpClient(
      // withFetch(), // SSR
      withInterceptors(HttpInterceptorProvider),
      withXsrfConfiguration({
        cookieName: "X-XSRF-TOKEN"
      })
    ),
    APP_INITIALIZE,
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient, HttpBackend]
        },
        defaultLanguage: 'fa',
        useDefaultLang: true
      })
    ),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue() {
        inject(ClTitleService).init(' سامانه مدیریت انبار', ' | ')
      }
    }
  ]
};
