import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import {
  deleteUserUseCaseProvider,
  getAllUsersUseCaseProvider,
  saveUserUseCaseProvider,
  updateUserUseCaseProvider,
  UserGateway,
  UserModel
} from '@domain/lib/user-management';
import { ClAction, ClColumn, ClColumnDataType } from '@sadad/component-lib/src/models';
import { UserFacade } from '@state/lib/facade';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserImplementationService } from '@api/lib/impl';
import { ActionInvokeService } from '@view/lib/ui-services';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { ClConfirmation } from '@sadad/component-lib/src/models/confirmation';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { DataTableAction } from '@view/lib/models';



@Component({
  selector: 'user-users',
  standalone: true,
  imports: [CommonModules, CrudComponent, AddUserComponent],
  templateUrl: './users.component.html',
  providers: [
    { provide: UserGateway, useClass: UserImplementationService },
    getAllUsersUseCaseProvider,
    saveUserUseCaseProvider,
    deleteUserUseCaseProvider,
    updateUserUseCaseProvider,
    UserFacade
  ]
})
export class UsersComponent extends BaseComponent<UserModel> implements OnInit {
  protected readonly userFacade = inject(UserFacade);

  readonly #invokeService = inject(ActionInvokeService);
  readonly #confirmationService = inject(ClConfirmationService);

  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();

    this.userFacade.updateUsers({});
    this.userFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);
  }

  ngOnInit() {
    this.first$ = computed(() => this.userFacade.userStore.state$().pageNumber$() * this.userFacade.userStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.userFacade.userStore.state$().total$() > this.userFacade.userStore.state$().pageSize$());

    this.cols =  [
      {
        colSpan: 1,
        value: ['name', 'lName'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('user-management.user.label')
      },
      {
        colSpan: 1,
        value: ['nationalNumber'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('user-management.national-number')
      },
      {
        colSpan: 1,
        value: ['employeeNumber'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('user-management.employee-number')
      },
      {
        colSpan: 1,
        value: ['organizationName'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('organization')
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
        command: (event) => this.deleteUser(event),
        key: 'Delete'
      }
    ];
  }

  openEditDialog(event: { action: ClAction, row: UserModel }) {
    this.userFacade.toggleEditMode(true);
    this.userFacade.updateSelectedUser(event.row);
    this.userFacade.toggleDialogVisibility(true);
  }

  // @Confirmation('test message') //todo
  deleteUser(event: { action: ClAction, row: UserModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => event.row.id ? this.userFacade.deleteUser(event.row.id) : ''
    });
  }

  setEditMode() {
    this.userFacade.toggleEditMode(false);
    this.userFacade.toggleDialogVisibility(true);
  }

  saveOrUpdateUser() {
    this.#invokeService.invokeMethod('add or update user');
  }

  resetForm() {
    this.userFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  filterUsers(event: UserModel) {
    // cacheClear['updateUsers'].clear();
    this.userFacade.updatePage(this.userFacade.userStore.state$().pageSize$(), 0);
    this.userFacade.updateUsers(
      {
        ...event,
      pageNumber: 0,
      pageSize: this.userFacade.userStore.state$().pageSize$()
    });
  }

  clearFilters() {
    // cacheClear['updateUsers'].clear();
    this.formGroup?.markAsUntouched();
  }

  page(event: { rows: number, first: number, page: number } & UserModel) {
    this.userFacade.updatePage(event.rows, event.page - 1);
    this.userFacade.updateUsers(
      {
        ...event,
        pageNumber: this.userFacade.userStore.state$().pageNumber$(),
        pageSize: this.userFacade.userStore.state$().pageSize$()
      });
  }

}
