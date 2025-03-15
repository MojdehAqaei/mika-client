import { inject, Injectable } from '@angular/core';
import {
  UserModel,
  GetUsersUseCase,
  SaveUserUseCse,
  UpdateUserUseCase,
  DeleteUserUseCase,
  UserModelFilter,
  usersFilterDataMapper
} from '@domain/lib/user-management';
import { UsersStore } from '../../store';
import { Cache, cacheClear } from '@sadad/component-lib/src/decorators';
import { Crud } from "@view/lib/data-types";


@Injectable()
export class UserFacade {

  /** -------- first call the api -------- **/
  /** -------- then update the state -------- **/
  public userStore = inject(UsersStore);

  readonly #getUsersUseCase = inject(GetUsersUseCase);
  readonly #saveUserUseCse = inject(SaveUserUseCse);
  readonly #updateUserUseCase = inject(UpdateUserUseCase);
  readonly #deleteUserUseCase = inject(DeleteUserUseCase);

  constructor() {
    this.userStore.updatePageNumber(0);
  }

  toggleEditMode(editMode: boolean) {
    this.userStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.userStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.userStore.updatePageSize(pageSize);
    this.userStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.userStore.updateAllowedActions(actions);
  }

  saveUser(user: UserModel) {
    this.userStore.updateDialogLoading(true);
    this.#saveUserUseCse.execute(user).subscribe({
      next: (res) => {
        // adding the new user to the list
        const total = this.userStore.state$().total$();
        const list = this.userStore.state$().users$();
        list.push(res);
        this.userStore.updateUsers([...list]);

        this.userStore.updateDialogLoading(false);
        this.userStore.updateDialogVisibility(false);
        this.userStore.updateTotal(total + 1);
      },
      error: () => {
        this.userStore.updateDialogLoading(false);
      }
    });
  }

  updateUser(user: UserModel) {
    this.userStore.updateDialogLoading(true);
    this.#updateUserUseCase.execute(user).subscribe({
      next: (res) => {
        // updating the selected user in the list
        const list = this.userStore.state$().users$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.userStore.updateUsers([...list]);

        this.userStore.updateDialogLoading(false);
        this.userStore.updateDialogVisibility(false);
      },
      error: () => {
        this.userStore.updateDialogLoading(false);
      }
    });
  }

  deleteUser(id: number) {
    this.#deleteUserUseCase.execute(id).subscribe(() => {
      // removing the deleted user from the list
      const total = this.userStore.state$().total$();
      const list = this.userStore.state$().users$();
      const index = list.findIndex(i => i.id == id);
      list.splice(index, 1);
      this.userStore.updateUsers([...list]);
      this.userStore.updateTotal(total - 1);
    })
  }

  updateSelectedUser(role: UserModel) {
    this.userStore.updateSelectedUser(role);
  }

  // @Cache()
  updateUsers(filters: UserModel) {
    this.#getUsersUseCase.execute(filters).subscribe(res => {
      this.userStore.updateUsers(res);
      res?.length && res[0].totalElements ? this.userStore.updateTotal(res[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as UserModelFilter] != undefined && usersFilterDataMapper.has(each as UserModelFilter)) {
          tmp.push(usersFilterDataMapper.get(each as UserModelFilter)|| '');
        }
      })
      this.userStore.updateSearchFilterLabels(tmp);
    })
  }
}
