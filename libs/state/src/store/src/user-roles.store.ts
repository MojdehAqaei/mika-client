import { Injectable, Signal } from '@angular/core';
import { Store } from '../store';
import { userRolesInitialState, UserRolesState } from '../../state';
import { UserRoleModel } from '@domain/lib/user-management';
import { Crud } from "@view/lib/data-types";



@Injectable()
export class UserRolesStore {
  #store = new Store<UserRolesState>(userRolesInitialState);

  public readonly state$: Signal<UserRolesState> = this.#store.state$.asReadonly();

  updateUserRoles(userRoles: UserRoleModel[]) {
    this.#store.updateField('userRoles$', userRoles);
  }

  updateSelectedUserRole(userRole: UserRoleModel | null) {
    this.#store.updateField('selectedUserRole$', userRole);
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
