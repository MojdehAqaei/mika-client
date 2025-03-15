import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { env } from '.env/.dev';

export const httpRequestHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  let headers: HttpHeaders = new HttpHeaders();

  if (!req.url.includes('files')) {
    headers = headers.append('Content-Type', 'application/json ; charset=UTF-8');
  }

  const newReq = req.clone({
    url: !req.url.includes('logout') && !req.url.includes('protected/user/change-token') && !req.url.includes('assets/i18n') ? env.baseURL + '/' + req.url : req.url,
    withCredentials: env.withCredentials,
    headers
  });

  return next(newReq);
};
