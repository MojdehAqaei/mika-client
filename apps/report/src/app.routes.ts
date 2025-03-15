import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@report/routes').then((m) => m.remoteRoutes),
  },
];
