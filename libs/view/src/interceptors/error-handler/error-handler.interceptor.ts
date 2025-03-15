import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClMessageService } from '@sadad/component-lib/src/services';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const message = inject(ClMessageService);
  const translate = inject(TranslateService);
  return next(req).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse) {
        let errorMessage: string;
        switch (err.status) {
          case 0:
            errorMessage = translate.instant('error.network');
            break;
          case 400:
            errorMessage = translate.instant('error.bad-request');
            break;
          case 401:
            errorMessage = translate.instant('error.authentication');
            break;
          case 403:
            errorMessage = translate.instant('error.forbidden');
            break;
          case 404:
            errorMessage = translate.instant('error.not-found');
            break;
          case 409:
            errorMessage = translate.instant('error.conflict');
            break;
          case 422:
            errorMessage = err.error?.message;
            break;
          case 500:
            errorMessage = translate.instant('error.internal-server');
            break;
          default:
            errorMessage = err.status + ", " + err.statusText;
            break;
        }

        message.add({
          type: 'error' ,
          detail: errorMessage,
          closeable: true,
          lifeTime: 2500
        });
      }

      return throwError(() => new Error(err.message));
    })
  );
};
