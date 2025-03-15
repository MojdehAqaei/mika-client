
import { Route } from '@angular/router';
import { Metadata } from '@view/lib/models';
import { ApplicationRoutes } from '@view/lib/data-types';

export const appRoutes: Route[] = [
  {path: ApplicationRoutes.inventory, children: [
      {
        path: ApplicationRoutes.home,
        data: { title: 'خانه', breadcrumb: 'خانه', isMenuExpanded: true } as Metadata,
        loadComponent: () => import('./app/home/home.component').then(mod => mod.HomeComponent)
      },
      {
        path: ApplicationRoutes.userManagement,
        data: {breadcrumb: 'تنظیمات و دسترسی'} as Metadata,
        loadChildren: () =>
          import('@user-management/routes').then((m) => m.remoteRoutes),
      },
      {
        path: ApplicationRoutes.baseData,
        data: {breadcrumb: 'کالا و خدمات'} as Metadata,
        loadChildren: () =>
          import('@base-data/routes').then((m) => m.remoteRoutes),
      },
      {
        path: ApplicationRoutes.stockroom,
        data: {breadcrumb: 'انبار و مراکز نگهداری'} as Metadata,
        loadChildren: () =>
          import('@stockroom/routes').then((m) => m.remoteRoutes),
      },
      {
        path: ApplicationRoutes.purchaseAndOrders,
        data: {breadcrumb: 'خرید و سفارشات'} as Metadata,
        loadChildren: () =>
          import('@purchase-and-orders/routes').then((m) => m.remoteRoutes),
      },
      {
        path: ApplicationRoutes.report,
        data: {breadcrumb: 'گزارش'} as Metadata,
        loadChildren: () =>
          import('@report/routes').then((m) => m.remoteRoutes),
      },
    ]
  },
  {
    path: '', redirectTo: `${ApplicationRoutes.inventory}/${ApplicationRoutes.home}`, pathMatch: 'full'
  },
  {
    path: ApplicationRoutes.accessDenied, data: {type: 'access denied'} as Metadata, loadComponent: () => import('@view/lib/components').then(mod => mod.PageComponent)
  },
  {
    path: ApplicationRoutes.error, data: {type: 'error'} as Metadata, loadComponent: () => import('@view/lib/components').then(mod => mod.PageComponent)
  },
  {
    path: '**', data: {type: 'not found'} as Metadata, loadComponent: () => import('@view/lib/components').then(mod => mod.PageComponent)
  }
];
