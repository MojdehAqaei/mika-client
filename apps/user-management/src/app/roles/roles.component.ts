import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import { ClAction, ClColumn, ClColumnDataType } from '@sadad/component-lib/src/models';
import { RoleFacade } from '@state/lib/facade';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { AddRoleComponent } from '../add-role/add-role.component';
import {
  PermissionGateway,
  RoleGateway,
  RoleModel,
  deleteRoleUseCaseProvider,
  getAllPermissionsUseCaseProvider,
  getAllRolesUseCaseProvider,
  saveRoleUseCaseProvider,
  updateRoleUseCaseProvider,
} from '@domain/lib/user-management';
import { RoleImplementationService, PermissionImplementationService } from '@api/lib/impl';
import { ActionInvokeService } from '@view/lib/ui-services';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { ClConfirmation } from '@sadad/component-lib/src/models/confirmation';
import { cacheClear } from '@sadad/component-lib/src/decorators';
// import { Confirmation } from '@view/lib/decorators';
import { DataTableAction } from '@view/lib/models';



@Component({
  selector: 'user-roles',
  standalone: true,
  imports: [CommonModules, CrudComponent, AddRoleComponent],
  templateUrl: './roles.component.html',
  styles: ``,
  providers: [
    { provide: RoleGateway, useClass: RoleImplementationService },
    { provide: PermissionGateway, useClass: PermissionImplementationService },
    deleteRoleUseCaseProvider,
    updateRoleUseCaseProvider,
    saveRoleUseCaseProvider,
    getAllRolesUseCaseProvider,
    getAllPermissionsUseCaseProvider,
    RoleFacade,
  ]
})
export class RolesComponent extends BaseComponent<RoleModel> implements OnInit {

  protected readonly roleFacade = inject(RoleFacade);
  readonly #confirmationService = inject(ClConfirmationService);
  readonly #invokeService = inject(ActionInvokeService);

  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();

    this.roleFacade.updateRoles({});
    this.roleFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);
  }

  ngOnInit() {
    this.first$ = computed(() => this.roleFacade.roleStore.state$().pageNumber$() * this.roleFacade.roleStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.roleFacade.roleStore.state$().total$() > this.roleFacade.roleStore.state$().pageSize$());

    this.cols =  [
      {
        colSpan: 1,
        value: ['id'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('user-management.role.value')
      },
      {
        colSpan: 1,
        value: ['label'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('user-management.role.label')
      },
      {
        colSpan: 1,
        value: ['createDate'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('create-date')
      },
      {
        colSpan: 1,
        value: ['isActive'],
        type: ClColumnDataType.BOOLEAN,
        header: this.translate.instant('status')
      }
    ];

    this.actions = [
      {
        label: this.translate.instant('edit'),
        icon: 'edit',
        styleClasses: 'blue-text text-darken-2',
        command: (event) => this.openEditDialog(event),
        key: 'Update'
      },
      {
        label: this.translate.instant('delete'),
        icon: 'delete',
        styleClasses: 'red-text text-darken-2',
        command: (event) => this.deleteRole(event),
        key: 'Delete'
      }
    ];
  }

  openEditDialog(event: { action: ClAction, row: RoleModel }) {
    this.roleFacade.toggleEditMode(true);
    this.roleFacade.updateSelectedRole(event.row);
    this.roleFacade.toggleDialogVisibility(true);
  }

  // @Confirmation('test message') //todo
  deleteRole(event: { action: ClAction, row: RoleModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => event.row.id ? this.roleFacade.deleteRole(event.row.id) : ''
    })
  }

  setEditMode() {
    this.roleFacade.toggleEditMode(false);
    this.roleFacade.toggleDialogVisibility(true);
  }

  saveOrUpdateRole() {
    this.#invokeService.invokeMethod('add or update role');
  }

  resetForm() {
    this.roleFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  filterRoles(event: RoleModel) {
    // cacheClear['updateRoles'].clear();
    this.roleFacade.updatePage(this.roleFacade.roleStore.state$().pageSize$(), 0);
    this.roleFacade.updateRoles({
      ...event,
      pageNumber: 0,
      pageSize: this.roleFacade.roleStore.state$().pageSize$()
    });
  }

  clearFilters() {
    // cacheClear['updateRoles'].clear();
    this.formGroup?.markAsUntouched();
  }

  page(event: { rows: number, first: number, page: number } & RoleModel) {
    this.roleFacade.updatePage(event.rows, event.page - 1);
    this.roleFacade.updateRoles({
      ...event,
      pageNumber: this.roleFacade.roleStore.state$().pageNumber$(),
      pageSize: this.roleFacade.roleStore.state$().pageSize$()
    });
  }

}
