import { inject, Injectable } from '@angular/core';
import {
  DeleteRoleUseCase,
  GetPermissionsUseCase,
  GetRolesUseCase,
  RoleModel,
  RoleModelFilter,
  rolesFilterDataMapper,
  SaveRoleUseCse,
  UpdateRoleUseCase
} from '@domain/lib/user-management';
import { RolesStore } from '../../store';
import { Cache } from '@sadad/component-lib/src/decorators';
import { Pagination } from '@view/lib/models';
import { Crud } from "@view/lib/data-types";

@Injectable()
export class RoleFacade {

  /** -------- first call the api -------- **/
  /** -------- then update the state -------- **/
  readonly #permissionsUseCase = inject(GetPermissionsUseCase);
  public readonly roleStore = inject(RolesStore);

  readonly #deleteRoleUseCase = inject(DeleteRoleUseCase);
  readonly #updateRoleUseCase = inject(UpdateRoleUseCase);
  readonly #saveRoleUseCase = inject(SaveRoleUseCse);
  readonly #getRolesUseCase = inject(GetRolesUseCase);


  constructor() {
    this.roleStore.updatePageNumber(0);
  }

  toggleEditMode(editMode: boolean) {
    this.roleStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.roleStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.roleStore.updatePageSize(pageSize);
    this.roleStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.roleStore.updateAllowedActions(actions);
  }

  saveRole(role: RoleModel) {
    this.roleStore.updateDialogLoading(true);
    this.#saveRoleUseCase.execute(role).subscribe({
      next: (res) => {

        const total = this.roleStore.state$().total$();
        const list = this.roleStore.state$().roles$();
        list.push(res);
        this.roleStore.updateRoles([...list]);

        this.roleStore.updateDialogVisibility(false);
        this.roleStore.updateDialogLoading(false);
        this.roleStore.updateTotal(total + 1);
      },
      error: () => {
        this.roleStore.updateDialogLoading(false);
      }
    });
  }

  updateRole(role: RoleModel) {
    this.roleStore.updateDialogLoading(true);
    this.#updateRoleUseCase.execute(role).subscribe({
      next: (res) => {
        const list = this.roleStore.state$().roles$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.roleStore.updateRoles([...list]);

        this.roleStore.updateDialogVisibility(false);
        this.roleStore.updateDialogLoading(false);
      },
      error: () => {
        this.roleStore.updateDialogLoading(false);
      }
    });
  }

  deleteRole(id: number) {
    this.#deleteRoleUseCase.execute(id).subscribe(() => {

      const total = this.roleStore.state$().total$();
      const roles = this.roleStore.state$().roles$();
      const index = roles.findIndex(i => i.id == id);
      roles.splice(index, 1);
      this.roleStore.updateRoles([...roles]);
      this.roleStore.updateTotal(total - 1);
    })
  }

  updateSelectedRole(role: RoleModel) {
    this.roleStore.updateSelectedRole(role);
  }

  @Cache()
  updatePermissions() {
    // (new GetPermissionsUseCase()).execute().subscribe(res => {
    this.#permissionsUseCase.execute().subscribe(res => { //todo remove
      this.roleStore.updatePermissions(res);
    })
  }

  // @Cache()
  updateRoles(filters: RoleModel & Pagination) {
    this.#getRolesUseCase.execute(filters).subscribe(res => {
      this.roleStore.updateRoles(res);
      res?.length && res[0]?.totalElements ? this.roleStore.updateTotal(res[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as RoleModelFilter] != undefined && rolesFilterDataMapper.has(each as RoleModelFilter)) {
          tmp.push(rolesFilterDataMapper.get(each as RoleModelFilter)|| '');
        }
      })
      this.roleStore.updateSearchFilterLabels(tmp);
    })
  }
}
