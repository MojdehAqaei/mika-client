import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { ClAction, ClColumn, ClColumnDataType, ClConfirmation } from '@sadad/component-lib/src/models';
import { ClConfirmationService } from '@sadad/component-lib/src/services';

import { BaseComponent, CrudComponent } from '@view/lib/components';
import {
  FiscalYearGateway,
  FiscalYearModel,
  deleteFiscalYearUseCaseProvider,
  getAllFiscalYearsUseCaseProvider,
  saveFiscalYearUseCaseProvider,
  updateFiscalYearUseCaseProvider
} from '@domain/lib/stockroom';
import { ActionInvokeService } from '@view/lib/ui-services';
import { FiscalYearFacade } from '@state/lib/facade';
import { FiscalYearImplementationService } from '@api/lib/impl';
import { AddFiscalYearComponent } from '../add-fiscal-year/add-fiscal-year.component';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { DataTableAction } from '@view/lib/models';

@Component({
  selector: 'stockroom-fiscal-years',
  standalone: true,
  imports: [CommonModules, CrudComponent, AddFiscalYearComponent],
  templateUrl: './fiscal-years.component.html',
  providers: [
    {
      provide: FiscalYearGateway,
      useClass: FiscalYearImplementationService
    },
    FiscalYearFacade,
    getAllFiscalYearsUseCaseProvider,
    updateFiscalYearUseCaseProvider,
    deleteFiscalYearUseCaseProvider,
    saveFiscalYearUseCaseProvider
  ]
})
export class FiscalYearsComponent extends BaseComponent<FiscalYearModel> implements OnInit {
  protected readonly fiscalYearFacade = inject(FiscalYearFacade);
  readonly #invokeService = inject(ActionInvokeService);
  readonly #confirmationService = inject(ClConfirmationService);

  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();
  }

  ngOnInit(): void {
    this.first$ = computed(() => this.fiscalYearFacade.fiscalYearStore.state$().pageNumber$() * this.fiscalYearFacade.fiscalYearStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.fiscalYearFacade.fiscalYearStore.state$().total$() > this.fiscalYearFacade.fiscalYearStore.state$().pageSize$());
    this.fiscalYearFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);

    this.cols = [
      {
        colSpan: 1,
        value: ['id'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.fiscal-year.code')
      },
      {
        colSpan: 1,
        value: ['title'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.fiscal-year.title')
      },
      {
        colSpan: 1,
        value: ['startDatePersian'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.fiscal-year.start-date')
      },
      {
        colSpan: 1,
        value: ['endDatePersian'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.fiscal-year.end-date')
      }
    ]

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
        command: (event) => this.deleteFiscalYear(event),
        key: 'Delete'
      }
    ];
  }

  openEditDialog(event: { action: ClAction, row: FiscalYearModel }) {
    this.fiscalYearFacade.toggleEditMode(true);
    this.fiscalYearFacade.updateSelectedFiscalYear(event.row);
    this.fiscalYearFacade.toggleDialogVisibility(true);
  }

  deleteFiscalYear(event: { action: ClAction, row: FiscalYearModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => this.fiscalYearFacade.deleteFiscalYear(Number(event.row.id))
    })
  }

  saveOrUpdateFiscalYear() {
    this.#invokeService.invokeMethod('add or update fiscal year');
  }

  resetForm() {
    this.fiscalYearFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  setEditMode() {
    this.fiscalYearFacade.toggleEditMode(false);
    this.fiscalYearFacade.toggleDialogVisibility(true);
  }

  filterFiscalYears(event: FiscalYearModel) {
    cacheClear['updateFiscalYears'].clear();
    this.fiscalYearFacade.updatePage(this.fiscalYearFacade.fiscalYearStore.state$().pageSize$(), 0);
    this.fiscalYearFacade.updateFiscalYears(
      {
        ...event,
        pageNumber: 0,
        pageSize: this.fiscalYearFacade.fiscalYearStore.state$().pageSize$()
      });
  }

  clearFilters() {
    // this.appFacade.updateFormSubmission(false);
  }

  page(event: { rows: number, first: number, page: number } & FiscalYearModel) {
    cacheClear['updateFiscalYears'].clear();
    this.fiscalYearFacade.updatePage(event.rows, event.page - 1);
    this.fiscalYearFacade.updateFiscalYears(
      {
        ...event,
        pageNumber: this.fiscalYearFacade.fiscalYearStore.state$().pageNumber$(),
        pageSize: this.fiscalYearFacade.fiscalYearStore.state$().pageSize$()
      });
  }

}
