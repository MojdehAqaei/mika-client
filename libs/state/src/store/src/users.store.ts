import { Injectable, Signal } from '@angular/core';
import { Store } from '../store';
import { userInitialState, UserState } from '../../state';
import { UserModel } from '@domain/lib/user-management';
import { Crud } from "@view/lib/data-types";


@Injectable()
export class UsersStore {
  #store = new Store<UserState>(userInitialState);

  public readonly state$: Signal<UserState> = this.#store.state$.asReadonly();

  updateUsers(users: UserModel[]) {
    this.#store.updateField('users$', users);
  }

  updateSelectedUser(user: UserModel) {
    this.#store.updateField('selectedUser$', user);
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
