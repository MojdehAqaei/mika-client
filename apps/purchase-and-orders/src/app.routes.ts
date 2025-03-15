import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@purchase-and-orders/routes').then((m) => m.remoteRoutes),
  },
];
