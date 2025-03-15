import { Component, computed, Inject, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import {
  deleteFiscalYearPerStockroomUseCaseProvider,
  FiscalYearPerStockroomGateway,
  FiscalYearPerStockroomModel,
  FiscalYearStatusEnum,
  getFiscalYearPerStockroomListUseCaseProvider,
  saveFiscalYearPerStockroomUseCaseProvider,
  updateFiscalYearPerStockroomUseCaseProvider
} from '@domain/lib/stockroom';
import { FiscalYearPerStockroomImplementationService } from '@api/lib/impl';
import {
  AddEditFiscalYearPerStockroomComponent
} from '../add-edit-fiscal-year-per-stockroom/add-edit-fiscal-year-per-stockroom.component';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import { FiscalYearPerStockroomFacade } from '@state/lib/facade';
import { ActionInvokeService } from '@view/lib/ui-services';
import { ClAction, ClColumn, ClColumnDataType, ClConfirmation } from '@sadad/component-lib/src/models';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { DataTableAction } from '@view/lib/models';

@Component({
  selector: 'stockroom-fiscal-year-per-stockroom',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModules, AddEditFiscalYearPerStockroomComponent, CrudComponent],
  providers: [
    FiscalYearPerStockroomFacade,
    {provide: FiscalYearPerStockroomGateway, useClass: FiscalYearPerStockroomImplementationService},
    getFiscalYearPerStockroomListUseCaseProvider,
    saveFiscalYearPerStockroomUseCaseProvider,
    updateFiscalYearPerStockroomUseCaseProvider,
    deleteFiscalYearPerStockroomUseCaseProvider
  ],
  templateUrl: './fiscal-year-per-stockroom.component.html',
  styleUrl: './fiscal-year-per-stockroom.component.scss'
})
export class FiscalYearPerStockroomComponent extends BaseComponent<FiscalYearPerStockroomModel> implements OnInit {
  protected readonly fiscalYearPerStockroomFacade = inject(FiscalYearPerStockroomFacade);
  readonly #invokeService = inject(ActionInvokeService);
  readonly #confirmationService = inject(ClConfirmationService);


  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();
  }

  ngOnInit(): void {
    this.first$ = computed(() => this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().pageNumber$() * this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().total$() > this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().pageSize$());
    this.fiscalYearPerStockroomFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);

    this.cols = [
      {
        colSpan: 1,
        value: ['fiscalYearTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.fiscal-year.')
      },
      {
        colSpan: 1,
        value: ['stockroomTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.title')
      },
      {
        colSpan: 1,
        value: ['datePersian'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.fiscal-year-per-stockroom.date')
      },
      {
        colSpan: 1,
        value: ['stateString'],
        cellConfig: [
          { key: "state", value: FiscalYearStatusEnum.ACTIVE, styleClass: "fiscal-year-state active" },
          { key: "state", value: FiscalYearStatusEnum.COUNTING, styleClass: "fiscal-year-state warehousing" },
          { key: "state", value: FiscalYearStatusEnum.INACTIVITY, styleClass: "fiscal-year-state inactive" },
          { key: "state", value: FiscalYearStatusEnum.FINANCIAL_PERIOD_END, styleClass: "fiscal-year-state end-of-fiscal-period" },
          { key: "state", value: FiscalYearStatusEnum.INVENTORY_PERIOD_END, styleClass: "fiscal-year-state end-of-inventory-period" },
        ],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('status')
      },
    ]

    this.actions = [
      {
        label: this.translate.instant('stockroom.fiscal-year-per-stockroom.change-state.end-of-fiscal-period'),
        icon: 'account_balance_wallet',
        styleClasses: 'purple-text text-darken-2',
        status: {
          status: true,
          on: [
            { rowField: 'state', rowValue: [FiscalYearStatusEnum.INVENTORY_PERIOD_END] }
          ]
        },
        command: (event) => this.confirmFiscalYearPerStockroomStateChange(event, FiscalYearStatusEnum.FINANCIAL_PERIOD_END),
        key: 'FiscalPeriodEnding'
      },
      {
        label: this.translate.instant('stockroom.fiscal-year-per-stockroom.change-state.end-of-inventory-period'),
        icon: 'inventory',
        styleClasses: 'amber-text text-darken-2',
        status: {
          status: true,
          on: [
            { rowField: 'state', rowValue: [FiscalYearStatusEnum.ACTIVE] }
          ]
        },
        command: (event) => this.confirmFiscalYearPerStockroomStateChange(event, FiscalYearStatusEnum.INVENTORY_PERIOD_END),
        key: 'InvntoryPeriodEnding'
      },
      {
        label: this.translate.instant('stockroom.fiscal-year-per-stockroom.change-state.inactive'),
        icon: 'inactive_order',
        styleClasses: 'red-text text-darken-2',
        status: {
          status: false,
          on: [
            { rowField: 'state', rowValue: [FiscalYearStatusEnum.ACTIVE] }
          ]
        },
        command: (event) => this.confirmFiscalYearPerStockroomStateChange(event, FiscalYearStatusEnum.INACTIVITY),
        key: 'Inactivity'
      },
      {
        label: this.translate.instant('delete'),
        icon: 'delete',
        styleClasses: 'red-text text-darken-2',
        command: (event) => this.deleteFiscalYearPerStockroom(event),
        key: 'Delete'
      }
    ];
  }

  confirmFiscalYearPerStockroomStateChange(event: { action: ClAction, row: FiscalYearPerStockroomModel }, state: FiscalYearStatusEnum) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.sure-to-change-state', {value: this.translate.instant('stockroom.fiscal-year.')}),
      accept: () => this.fiscalYearPerStockroomFacade.updateFiscalYearPerStockroom({...event.row, state: state})
    })
  }

  deleteFiscalYearPerStockroom(event: { action: ClAction, row: FiscalYearPerStockroomModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => this.fiscalYearPerStockroomFacade.deleteFiscalYear(Number(event.row.id))
    })
  }

  saveOrUpdateFiscalYearPerStockroom() {
    this.#invokeService.invokeMethod('add or update fiscal year per stockroom');
  }

  resetForm() {
    this.fiscalYearPerStockroomFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  setEditMode() {
    this.fiscalYearPerStockroomFacade.toggleEditMode(false);
    this.fiscalYearPerStockroomFacade.toggleDialogVisibility(true);
  }

  filterFiscalYearsPerStockroom(event: FiscalYearPerStockroomModel) {
    cacheClear['updateFiscalYearPeStockroomList'].clear();
    this.fiscalYearPerStockroomFacade.updatePage(this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().pageSize$(), 0);
    this.fiscalYearPerStockroomFacade.updateFiscalYearPeStockroomList(
      {
        ...event,
        pageNumber: 0,
        pageSize: this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().pageSize$()
      });
  }

  clearFilters() {
    // this.appFacade.updateFormSubmission(false);
  }

  page(event: { rows: number, first: number, page: number } & FiscalYearPerStockroomModel) {
    cacheClear['updateFiscalYearPeStockroomList'].clear();
    this.fiscalYearPerStockroomFacade.updatePage(event.rows, event.page - 1);
    this.fiscalYearPerStockroomFacade.updateFiscalYearPeStockroomList(
      {
        ...event,
        pageNumber: this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().pageNumber$(),
        pageSize: this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().pageSize$()
      });
  }
}
