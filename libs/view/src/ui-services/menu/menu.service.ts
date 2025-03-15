import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClMenuItem } from '@sadad/component-lib/src/models';

import { CategoryNames } from '@domain/lib/user-management'
import { ApplicationRoutes } from '../../data-types';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  readonly #translate = inject(TranslateService);
  readonly router = inject(Router);

  public createMenu(): ClMenuItem[] {
    return [
      {
        label: this.#translate.instant('menu.home'),
        icon: 'home',
        routerLink: `${ApplicationRoutes.inventory}/${ApplicationRoutes.home}`,
        value: CategoryNames.home,
      },
      {
        label: this.#translate.instant('menu.purchases-and-orders'),
        icon: 'shopping_cart',
        value: CategoryNames.purchaseAndOrderOperations,
      },
      {
        label: this.#translate.instant('menu.inventory-management'),
        icon: 'inventory',
        value: CategoryNames.inventoryOperations,
      },
      {
        label: this.#translate.instant('menu.reports-and-dashboards'),
        icon: 'assessment',
        value: CategoryNames.reportsAndDashboards,
      },
      {
        label: this.#translate.instant('menu.warehouses-and-storage-centers'),
        icon: 'store',
        value: CategoryNames.inventoryManagement,
      },
      {
        label: this.#translate.instant('menu.goods-and-services'),
        icon: 'card_giftcard',
        value: CategoryNames.goodAndServiceManagement,
      },
      {
        label: this.#translate.instant('menu.people-and-organizational-units'),
        icon: 'people',
        value: CategoryNames.personsAndOrganizationUnitsManagement,
      },
      {
        label: this.#translate.instant('menu.finance-and-accounting'),
        icon: 'account_balance',
        value: CategoryNames.accountingManagement,
      },
      {
        label: this.#translate.instant('menu.settings-and-access'),
        icon: 'settings',
        value: CategoryNames.applicationAndUsersManagement,
      },
    ]
  }

  public markExpandedRoutes(routes: ClMenuItem[]): ClMenuItem[] {
    const currentRoute = this.router.url;

    return routes.map(route => {
      if (route.items && route.items.length > 0) {
        // Recursively check child routes
        const childRoutes = this.markExpandedRoutes(route.items);
        const isExpanded = childRoutes.some(child => currentRoute.includes(route.routerLink) || child.expanded);
        return { ...route, items: childRoutes, expanded: isExpanded };
      } else {
        // Directly check the current route
        return { ...route, expanded: currentRoute.includes(route.routerLink) };
      }
    });
  }
}
