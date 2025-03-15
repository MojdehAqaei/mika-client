import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { UserContentAccessComponent } from '../user-content-access/user-content-access.component';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import {
  getUserRolesUseCaseProvider,
  saveUserRoleUseCaseProvider,
  updateUserRoleUseCaseProvider,
  deleteUserRoleUseCaseProvider,
  saveUserRoleContentPermissionsUseCaseProvider,
  getUserRoleContentPermissionsByIdUseCaseProvider,
  UserRoleGateway,
  UserRoleModel
} from '@domain/lib/user-management';
import { UserRolesFacade } from '@state/lib/facade';
import { ClAction, ClColumn, ClColumnDataType } from '@sadad/component-lib/src/models';
import { UserRoleImplementationService } from '@api/lib/impl';
import { ClConfirmation } from '@sadad/component-lib/src/models/confirmation';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { DataTableAction } from '@view/lib/models';

@Component({
  selector: 'user-user-roles',
  standalone: true,
  imports: [CommonModules, CrudComponent, UserContentAccessComponent],
  templateUrl: './user-roles.component.html',
  providers: [
    { provide: UserRoleGateway, useClass: UserRoleImplementationService},
    getUserRolesUseCaseProvider,
    saveUserRoleUseCaseProvider,
    updateUserRoleUseCaseProvider,
    deleteUserRoleUseCaseProvider,
    saveUserRoleContentPermissionsUseCaseProvider,
    getUserRoleContentPermissionsByIdUseCaseProvider,
    UserRolesFacade
  ]
})
export class UserRolesComponent extends BaseComponent<UserRoleModel> implements OnInit {
  protected readonly userRolesFacade = inject(UserRolesFacade);
  readonly #confirmationService = inject(ClConfirmationService);

  cols!: ClColumn[];
  actions?: DataTableAction[];
  contentDialogActiveIndex: number = 0;

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();

    this.userRolesFacade.updateUserRoles({});
    this.userRolesFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);
  }

  ngOnInit() {
    this.first$ = computed(() => this.userRolesFacade.userRolesStore.state$().pageNumber$() * this.userRolesFacade.userRolesStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.userRolesFacade.userRolesStore.state$().total$() > this.userRolesFacade.userRolesStore.state$().pageSize$());

    this.cols = [
      {
        colSpan: 1,
        value: ['userName', 'userLName'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('user-management.user.label')
      },
      {
        colSpan: 1,
        value: ['userNationalNumber'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('user-management.national-number')
      },
      {
        colSpan: 1,
        value: ['roleName'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('user-management.role.')
      },
      // {
      //   colSpan: 1,
      //   value: ['expiryDate'],
      //   type: ClColumnDataType.TEXT,
      //   header: this.translate.instant('user-management.permission-expiry-date')
      // },
      {
        colSpan: 1,
        value: ['isActive'],
        type: ClColumnDataType.BOOLEAN,
        header: this.translate.instant('base-data.status')
      }
    ];

    this.actions =  [
      {
        label: this.translate.instant('edit'),
        icon: 'edit',
        command: (event) => this.openEditDialog(event),
        styleClasses: 'blue-text text-darken-2',
        key: 'Update'
      },
      {
        label: this.translate.instant('delete'),
        icon: "delete",
        command: (event) => this.deleteUserRole(event),
        styleClasses: 'red-text text-darken-2',
        key: 'Delete'
      },
    ];
  }

  openEditDialog(event: { action: ClAction, row: UserRoleModel }) {
    this.contentDialogActiveIndex = 0;
    this.userRolesFacade.toggleEditMode(true);
    this.userRolesFacade.toggleDialogVisibility(true);
    this.userRolesFacade.updateSelectedUserRoles(event.row);
    this.userRolesFacade.getUserRoleContentPermissions(event.row.contentAccessLevel || []);
  }

  deleteUserRole(event: { action: ClAction, row: UserRoleModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => event.row.id ? this.userRolesFacade.deleteUserRole(event.row.id) : ''
    });
  }

  setEditMode() {
    this.contentDialogActiveIndex = 0;
    this.userRolesFacade.toggleEditMode(false);
    this.userRolesFacade.toggleDialogVisibility(true);
    this.userRolesFacade.updateSelectedUserRoles(null);
  }

  saveOrUpdateUserRoles() {
    this.formGroup?.markAllAsTouched();
  }

  resetForm() {
    this.userRolesFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  filterUserRoles(event: UserRoleModel) {
    // cacheClear['updateUserRoles'].clear();
    this.userRolesFacade.updatePage(this.userRolesFacade.userRolesStore.state$().pageSize$(), 0);
    this.userRolesFacade.updateUserRoles({
      ...event,
      pageNumber: 0,
      pageSize: this.userRolesFacade.userRolesStore.state$().pageSize$()
    });
  }

  clearFilters() {
    // cacheClear['updateUserRoles'].clear();
    this.formGroup?.markAsUntouched();
  }

  page(event: { rows: number, first: number, page: number } & UserRoleModel) {
    this.userRolesFacade.updatePage(event.rows, event.page - 1);
    this.userRolesFacade.updateUserRoles(
      {
        ...event,
        pageNumber: this.userRolesFacade.userRolesStore.state$().pageNumber$(),
        pageSize: this.userRolesFacade.userRolesStore.state$().pageSize$()
      });
  }
}
