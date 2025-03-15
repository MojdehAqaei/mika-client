import { ResolveFn } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ApplicationRoutes } from '@view/lib/data-types';
import { RoleImplementationService, UserImplementationService } from '@api/lib/impl';


export const baseResolver: ResolveFn<any> = (route, state): Observable<any> => {
  let observable: Observable<any> = EMPTY;
  const url = state.url.split('/').reverse()[0];

  switch (url){
    case ApplicationRoutes.users:
      observable = inject(UserImplementationService).getUserProfile(route.paramMap.get('id')!)
      break;
    case ApplicationRoutes.roles:
      observable = inject(RoleImplementationService).getRoles()
      break;
    default:
      //
      break;
  }

  return observable;
};
