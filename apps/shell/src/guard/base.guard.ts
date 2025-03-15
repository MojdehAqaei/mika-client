import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { Metadata } from '@view/lib/models';
import { ApplicationRoutes } from '@view/lib/data-types';

export const baseGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const appStore = inject(AppStore);
  const user = appStore.state$().loggedInUser$();

  if (user?.permissions?.some(p => p.data.name == (route.data as Metadata).permissionKey && p.data.value?.includes('Read'))) {
    return true;
  } else {
    router.navigate([ApplicationRoutes.accessDenied], { queryParams: { returnUrl: state.url }});
    return false;
  }
};
