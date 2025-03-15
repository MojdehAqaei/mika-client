import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import { AddEditPersonCompanyComponent } from '../add-edit-person-company/add-edit-person-company.component';
import {
  PersonCompanyGateway,
  PersonCompanyModel,
  personCompanyTypeDataMapper,
  getPersonCompanyByIdUseCaseProvider,
  getPersonCompanyListUseCaseProvider,
  savePersonCompanyUseCaseProvider,
  updatePersonCompanyUseCaseProvider,
  deletePersonCompanyUseCaseProvider,
  getOwnershipTypesUseCaseProvider,
  getContactInfoTypesUseCaseProvider,
  getAddressInfoTypesUseCaseProvider,
  getBanksUseCaseProvider
} from '@domain/lib/base-data';
import { PersonCompanyImplementationService } from '@api/lib/impl';
import { PersonCompanyFacade } from '@state/lib/facade';
import { ClAction, ClColumn, ClColumnDataType } from '@sadad/component-lib/src/models';
import { DataTableAction } from '@view/lib/models';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { ActionInvokeService } from '@view/lib/ui-services';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { ClConfirmation } from '@sadad/component-lib/src/models/confirmation';

@Component({
  selector: 'base-person-company',
  standalone: true,
  imports: [CommonModules, AddEditPersonCompanyComponent, CrudComponent],
  providers: [
    { provide: PersonCompanyGateway, useClass: PersonCompanyImplementationService },
    PersonCompanyFacade,
    getPersonCompanyListUseCaseProvider,
    getPersonCompanyByIdUseCaseProvider,
    savePersonCompanyUseCaseProvider,
    updatePersonCompanyUseCaseProvider,
    deletePersonCompanyUseCaseProvider,
    getOwnershipTypesUseCaseProvider,
    getContactInfoTypesUseCaseProvider,
    getAddressInfoTypesUseCaseProvider,
    getBanksUseCaseProvider
  ],
  templateUrl: './person-company.component.html',
})
export class PersonCompanyComponent extends BaseComponent<PersonCompanyModel> implements OnInit {
  public readonly personCompanyFacade = inject(PersonCompanyFacade);

  readonly #invokeService = inject(ActionInvokeService);
  readonly #confirmationService = inject(ClConfirmationService);

  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();
  }

  ngOnInit() {
    this.first$ = computed(() => this.personCompanyFacade.personCompanyStore.state$().pageNumber$() * this.personCompanyFacade.personCompanyStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.personCompanyFacade.personCompanyStore.state$().total$() > this.personCompanyFacade.personCompanyStore.state$().pageSize$());
    this.personCompanyFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);

    this.cols =  [
      {
        colSpan: 1,
        value: ['nationalNumber'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.national-number')
      },
      {
        colSpan: 1,
        value: ['name'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.name')
      },
      {
        colSpan: 1,
        value: ['type'],
        valueMapper: [personCompanyTypeDataMapper],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.person-company.type')
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
        command: (event) => this.deletePersonCompany(event),
        key: 'Delete'
      }
    ];
  }

  openEditDialog(event: { action: ClAction, row: PersonCompanyModel }) {
    if (event.row.id) {
      this.personCompanyFacade.toggleEditMode(true);
      this.personCompanyFacade.getSelectedPersonCompanyById(event.row.id);
      this.personCompanyFacade.toggleDialogVisibility(true);
    }
  }

  deletePersonCompany(event: { action: ClAction, row: PersonCompanyModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => event.row.id ? this.personCompanyFacade.deletePersonCompanyById(event.row.id) : ''
    });
  }

  saveOrUpdatePersonCompany() {
    this.#invokeService.invokeMethod('add or update person/company');
  }

  filterPersonCompany(event: PersonCompanyModel) {
    cacheClear['updatePersonCompanyList'].clear();
    this.personCompanyFacade.updatePage(this.personCompanyFacade.personCompanyStore.state$().pageSize$(), 0);
    this.personCompanyFacade.updatePersonCompanyList(
      {
        ...event,
        pageNumber: this.personCompanyFacade.personCompanyStore.state$().pageNumber$(),
        pageSize: this.personCompanyFacade.personCompanyStore.state$().pageSize$()
      });
  }

  clearFilters() {
    cacheClear['updatePersonCompanyList'].clear();
    this.formGroup?.markAsUntouched();
  }

  setEditMode() {
    this.personCompanyFacade.toggleEditMode(false);
    this.personCompanyFacade.toggleDialogVisibility(true);
  }

  resetForm() {
    this.personCompanyFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  page(event: { rows: number, first: number, page: number } & PersonCompanyModel) {
    cacheClear['updatePersonCompanyList'].clear();
    this.personCompanyFacade.updatePage(event.rows, event.page - 1);
    this.personCompanyFacade.updatePersonCompanyList(
      {
        ...event,
        pageNumber: this.personCompanyFacade.personCompanyStore.state$().pageNumber$(),
        pageSize: this.personCompanyFacade.personCompanyStore.state$().pageSize$()
      });
  }

}
