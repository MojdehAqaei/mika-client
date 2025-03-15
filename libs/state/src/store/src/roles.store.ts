import { Injectable, Signal } from '@angular/core';
import { RoleModel, RolePermissionModel } from '@domain/lib/user-management';
import { Store } from '../store';
import { roleInitialState, RoleState } from '../../state';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { Crud } from "@view/lib/data-types";


@Injectable()
export class RolesStore {
  #store = new Store<RoleState>(roleInitialState);

  public readonly state$: Signal<RoleState> = this.#store.state$.asReadonly();

  updateRoles(roles: RoleModel[]) {
    this.#store.updateField('roles$', roles);
  }

  updateSelectedRole(role: RoleModel) {
    this.#store.updateField('selectedRole$', role);
  }

  updatePermissions(permissions: ClTreeNode<RolePermissionModel>[]) {
    this.#store.updateField('permissions$', permissions);
  }

  updateEditMode(editMode: boolean) {
    this.#store.updateField('editMode$', editMode);
  }

  updateDialogLoading(lazyLoading: boolean) {
    this.#store.updateField('dialogLoading$', lazyLoading);
  }

  updateDialogVisibility(visible: boolean) {
    this.#store.updateField('dialogVisible$', visible);
  }

  updatePageSize(size: number) {
    this.#store.updateField('pageSize$', size);
  }

  updatePageNumber(number: number) {
    this.#store.updateField('pageNumber$', number);
  }

  updateTotal(total: number) {
    this.#store.updateField('total$', total);;
  }

  updateSearchFilterLabels(labels: string[]) {
    this.#store.updateField('searchFilterLabels$', labels);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.#store.updateField('allowedActions$', actions);
  }
}
