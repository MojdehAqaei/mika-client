import { inject, Injectable } from '@angular/core';
import {
  DeleteUserRoleUseCase,
  GetUserRolesUseCase,
  SaveUserRoleUseCase,
  UpdateUserRoleUseCase,
  SaveUserRoleContentPermissionsUseCase,
  GetUserRoleContentPermissionsByIdUseCase,
  UserContentAccessModel,
  UserRoleModel, userRolesFilterDataMapper, UserRoleModelFilter
} from '@domain/lib/user-management';
import { UserRolesStore } from '../../store';
import { Cache } from '@sadad/component-lib/src/decorators';
import { concatMap, from } from 'rxjs';
import { Crud } from "@view/lib/data-types";


@Injectable()
export class UserRolesFacade {

  /** -------- first call the api -------- **/
  /** -------- then update the state -------- **/
  public userRolesStore = inject(UserRolesStore);

  readonly #getUserRolesUseCase = inject(GetUserRolesUseCase);
  readonly #saveUserRoleUseCase = inject(SaveUserRoleUseCase);
  readonly #updateUserRoleUseCase = inject(UpdateUserRoleUseCase);
  readonly #deleteUserRoleUseCase = inject(DeleteUserRoleUseCase);
  readonly #saveUserRoleContentPermissionsUseCase = inject(SaveUserRoleContentPermissionsUseCase);
  readonly #getUserRoleContentPermissionsByIdUseCase = inject(GetUserRoleContentPermissionsByIdUseCase);

  constructor() {
    this.userRolesStore.updatePageNumber(0);
  }

  toggleEditMode(editMode: boolean) {
    this.userRolesStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.userRolesStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.userRolesStore.updatePageSize(pageSize);
    this.userRolesStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.userRolesStore.updateAllowedActions(actions);
  }

  saveUserRole(userRole: UserRoleModel) {
    this.userRolesStore.updateDialogLoading(true);
    this.#saveUserRoleUseCase.execute(userRole).subscribe({
      next: (res) => {
        // adding the new user-role to the list
        const total = this.userRolesStore.state$().total$();
        const list = this.userRolesStore.state$().userRoles$();
        const savedUserRole = {...res};
        list.push(savedUserRole);
        this.userRolesStore.updateUserRoles([...list]);
        this.userRolesStore.updateSelectedUserRole(res);

        this.userRolesStore.updateDialogLoading(false);
        this.userRolesStore.updateTotal(total + 1);
      },
      error: () => {
        this.userRolesStore.updateDialogLoading(false);
      }
    });
  }

  updateUserRole(userRole: UserRoleModel) {
    this.userRolesStore.updateDialogLoading(true);
    return this.#updateUserRoleUseCase.execute(userRole).subscribe({
      next: (res) => {
        // updating the selected user-role in the list
        const list = this.userRolesStore.state$().userRoles$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, { ...res });
        this.userRolesStore.updateUserRoles([...list]);

        this.userRolesStore.updateDialogLoading(false);
      },
      error: () => {
        this.userRolesStore.updateDialogLoading(false);
      }
    });
  }

  deleteUserRole(id: number) {
    this.#deleteUserRoleUseCase.execute(id).subscribe(() => {
      // removing the deleted user role from the list
      const total = this.userRolesStore.state$().total$();
      const list = this.userRolesStore.state$().userRoles$();
      const index = list.findIndex(i => i.id == id);
      list.splice(index, 1);
      this.userRolesStore.updateUserRoles([...list]);
      this.userRolesStore.updateTotal(total - 1);
    });
  }

  saveUserRoleContentPermissions(body: UserContentAccessModel, closeDialog: boolean) {
    this.userRolesStore.updateDialogLoading(true);
    this.#saveUserRoleContentPermissionsUseCase.execute(body).subscribe({
      next: () => {
        this.userRolesStore.updateDialogLoading(false);
        this.userRolesStore.updateDialogVisibility(closeDialog);
      },
      error: () => {
        this.userRolesStore.updateDialogLoading(false);
      }
    });
  }

  getUserRoleContentPermissions(list: UserContentAccessModel[]) {
    this.userRolesStore.updateDialogLoading(true);
    from(list)
      .pipe(
        concatMap(each => this.#getUserRoleContentPermissionsByIdUseCase.execute(each))
      ).subscribe({
      next: (res) => {
        const userRole = this.userRolesStore.state$().selectedUserRole$();
        const contentPermission = userRole?.contentAccessLevel?.find(x => x.label == res.label);
        if (contentPermission) {
          contentPermission.idList = res.idList;
          contentPermission.selectionMode = res.selectionMode;
          contentPermission.userRoleId = res.userRoleId;
        }
        this.userRolesStore.updateSelectedUserRole(userRole);

        this.userRolesStore.updateDialogLoading(false);
      },
      error: () => {
        this.userRolesStore.updateDialogLoading(false);
      }
    });
  }

  updateSelectedUserRoles(userRole: UserRoleModel | null) {
    this.userRolesStore.updateSelectedUserRole(userRole);
  }

  // @Cache()
  updateUserRoles(filters: UserRoleModel) {
    this.#getUserRolesUseCase.execute(filters).subscribe(
      data => {
        this.userRolesStore.updateUserRoles(data);
        data?.length && data[0].totalElements ? this.userRolesStore.updateTotal(data[0].totalElements) : '';

        // update search filter labels
        const tmp: string[] = [];
        Object.keys(filters).forEach(each => {
          if (filters[each as UserRoleModelFilter] != undefined && userRolesFilterDataMapper.has(each as UserRoleModelFilter)) {
            tmp.push(userRolesFilterDataMapper.get(each as UserRoleModelFilter)|| '');
          }
        })
        this.userRolesStore.updateSearchFilterLabels(tmp);
      }
    );
  }
}
