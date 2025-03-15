import { inject, Injectable, Signal, signal } from '@angular/core';
import { Store } from "../store";
import { AppState, appInitialState } from "../../state";
import {
  CategoryNames,
  permissionToRouteDataMapper,
  RoleModel,
  RolePermissionModel,
  UserRoleModel
} from '@domain/lib/user-management';
import { FiscalYearModel } from '@domain/lib/stockroom';
import { ClMenuItem, ClTreeNode } from '@sadad/component-lib/src/models';
import { MenuService } from '@view/lib/ui-services';
import { Metadata } from '@view/lib/models';

@Injectable({
  providedIn: "root" // global state
})
export class AppStore {
  // # is similar to 'private' keyword but better. private is a design-time check whereas # brings in true encapsulation
  readonly #store = new Store<AppState>(appInitialState);

  readonly #menuService = inject(MenuService);


  public readonly state$: Signal<AppState> = this.#store.state$.asReadonly();


  updateLoggedInUser(user: UserRoleModel | null) {
    this.#store.updateField('loggedInUser$', user);
  }

  updateLoggedInUserRoles(roles: RoleModel[]) {
    this.#store.updateField('loggedInUserRoles$', roles);
  }

  updatePageMetadata(metadata: Metadata) {
    this.#store.updateField('pageMetadata$', metadata);
  }

  updateIdle(isIdle: boolean) {
    this.#store.updateField('isIdle$', isIdle);
  }

  updateActiveFiscalPeriod(fiscalPeriod: FiscalYearModel | null) {
    this.#store.updateField('activeFiscalPeriod$', fiscalPeriod);
  }

  updateFiscalPeriodsList(fiscalPeriods: FiscalYearModel[]) {
    this.#store.updateField('fiscalPeriodsList$', fiscalPeriods);
  }

  updateMenu(userPermissions?: ClTreeNode<RolePermissionModel>[]) {
    let menu: ClMenuItem[] = this.#menuService.createMenu();

    if (userPermissions?.length) {
      userPermissions.forEach(permission => {
        const menuItem = menu.find((item) => item.value === permission.data.upperMenuName && permission.data.value?.includes('Read'));

        if (menuItem) {
          menuItem.items = menuItem.items ?? [];
          menuItem.items.push({
            // @ts-ignore
            id: permission.key, // for sorting sub-menu items
            value: permission.data.name,
            // icon: 'circle',
            label: permission.label,
            routerLink: permissionToRouteDataMapper.get(permission.data.name!)
          });
        }
      });

      /** remove menu items that have zero sub menus */
      menu = menu.filter(i => i.items?.length || i.value == CategoryNames.home);

      /** sort sub-menu items */
      menu.forEach(each => {
        if (each.items?.length) {
          // @ts-ignore
          each.items.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)) // for sorting sub-menu items
        }
      });

      menu = this.#menuService.markExpandedRoutes(menu);
    } else menu = [];
    this.#store.updateField('menuItems$', menu);
  }

}
