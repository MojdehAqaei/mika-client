
import { ClLoadingInterceptor } from '@sadad/component-lib/src/interceptors';
import { HttpInterceptorFn } from "@angular/common/http";
import { httpRequestHeaderInterceptor } from './http-request-header/http-request-header.interceptor';
import { errorHandlerInterceptor } from './error-handler/error-handler.interceptor';
import { httpResponseModifierInterceptor } from './http-response-modifier/http-response-modifier.interceptor';
// import { stopRequestInterceptor } from './stop-request/stop-request.interceptor';


/** the interceptors will be executed in the order with which they are provided **/
export const HttpInterceptorProvider = [
  httpRequestHeaderInterceptor,
  // stopRequestInterceptor,
  errorHandlerInterceptor,
  ClLoadingInterceptor,
  httpResponseModifierInterceptor
] as HttpInterceptorFn[];
