import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { inject } from '@angular/core';
import { ClMessageService } from '@sadad/component-lib/src/services';
import { Pagination } from '../../models';

interface ResponseBody extends Pagination {
  data?: any;
  message?: string;
}

export const httpResponseModifierInterceptor: HttpInterceptorFn = (req, next) => {
  const message = inject(ClMessageService);

  return next(req).pipe(
    map(res => {
      if (res instanceof HttpResponse) {
        let body: any;
        const statusText = (res?.body as ResponseBody)?.message;

        if ((res?.body as ResponseBody)?.data) {
          if ((res?.body as ResponseBody)?.totalElements) {
            if (Array.isArray((res?.body as ResponseBody)?.data)) {
              body = (res?.body as ResponseBody)?.data?.map((each: any) =>  { return {...each, totalElements: (res?.body as ResponseBody)?.totalElements}});
            } else if (typeof (res?.body as ResponseBody)?.data == 'object') {
              body = {
                ...(res?.body as ResponseBody)?.data,
                totalElements: (res?.body as ResponseBody)?.totalElements
              }
            } else {
              body = (res?.body as ResponseBody)?.data;
            }
          } else {
            body = (res?.body as ResponseBody)?.data;
          }
        } else {
          body = res?.body;
        }

        if (statusText) {
          message.add({
            type: 'success' ,
            detail: statusText,
            closeable: true,
            lifeTime: 2500
          });
        }

        return  res.clone({ body: body });
      }

      return res;
    })
  );
};
