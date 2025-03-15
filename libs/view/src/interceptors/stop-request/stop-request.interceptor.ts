import { HttpInterceptorFn } from '@angular/common/http';
import { NEVER } from 'rxjs';
import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';

;

export const stopRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const appStore = inject(AppStore) //ExternalInjectorService.injector.get(AppStore)

  if (appStore.state$().isIdle$()) {
    return NEVER;
  }
  return next(req);
};
