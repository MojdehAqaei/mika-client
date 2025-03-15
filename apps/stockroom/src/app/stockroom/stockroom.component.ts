import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import { AddEditStockroomComponent } from '../add-edit-stockroom/add-edit-stockroom.component';
import {
  deleteStockroomUseCaseProvider,
  getStockroomsUseCaseProvider,
  saveStockroomUseCaseProvider,
  updateStockroomUseCaseProvider,
  StockroomGateway,
  StockroomModel
} from '@domain/lib/stockroom';
import { StockroomFacade } from '@state/lib/facade';
import { ActionInvokeService } from '@view/lib/ui-services';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { ClAction, ClColumn, ClColumnDataType } from '@sadad/component-lib/src/models';
import { ClConfirmation } from '@sadad/component-lib/src/models/confirmation';
import { StockroomImplementationService } from '@api/lib/impl';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { DataTableAction } from '@view/lib/models';

@Component({
  selector: 'stockroom-stockroom',
  standalone: true,
  imports: [CommonModules, CrudComponent, AddEditStockroomComponent],
  providers: [
    {provide: StockroomGateway, useClass: StockroomImplementationService},
    getStockroomsUseCaseProvider,
    deleteStockroomUseCaseProvider,
    saveStockroomUseCaseProvider,
    updateStockroomUseCaseProvider,
    StockroomFacade
  ],
  templateUrl: './stockroom.component.html'
})
export class StockroomComponent extends BaseComponent<StockroomModel> implements OnInit {
  readonly stockroomFacade = inject(StockroomFacade);
  readonly #invokeService = inject(ActionInvokeService);
  readonly #confirmationService = inject(ClConfirmationService);


  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();
  }

  ngOnInit() {
    this.first$ = computed(() => this.stockroomFacade.stockroomStore.state$().pageNumber$() * this.stockroomFacade.stockroomStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.stockroomFacade.stockroomStore.state$().total$() > this.stockroomFacade.stockroomStore.state$().pageSize$());
    this.stockroomFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);

    this.cols =  [
      {
        colSpan: 1,
        value: ['code'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.code')
      },
      {
        colSpan: 1,
        value: ['title'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.title')
      },
      {
        colSpan: 1,
        value: ['organizationName'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('organization')
      },
      {
        colSpan: 1,
        value: ['inventoryTypeTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.inventory-type.')
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
        command: (event) => this.deleteStockroom(event),
        key: 'Delete'
      }
    ];
  }

  openEditDialog(event: { action: ClAction, row: StockroomModel }) {
    this.stockroomFacade.toggleEditMode(true);
    this.stockroomFacade.updateSelectedStockroom(event.row);
    this.stockroomFacade.toggleDialogVisibility(true);
  }

  // @Confirmation('test message') //todo
  deleteStockroom(event: { action: ClAction, row: StockroomModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => event.row.id != undefined ? this.stockroomFacade.deleteStockroom(event.row.id) : ''
    });
  }

  setEditMode() {
    this.stockroomFacade.toggleEditMode(false);
    this.stockroomFacade.toggleDialogVisibility(true);
  }

  saveOrUpdateStockroom() {
    this.#invokeService.invokeMethod('add or update stockroom');
  }

  resetForm() {
    this.stockroomFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  filterStockrooms(event: StockroomModel) {
    cacheClear['updateStockroomsList'].clear();
    this.stockroomFacade.updatePage(this.stockroomFacade.stockroomStore.state$().pageSize$(), 0);
    this.stockroomFacade.updateStockroomsList(
      {
        ...event,
        pageNumber: 0,
        pageSize: this.stockroomFacade.stockroomStore.state$().pageSize$()
      });
  }

  clearFilters() {
    cacheClear['updateStockroomsList'].clear();
    // this.appFacade.updateFormSubmission(false);
  }

  page(event: { rows: number, first: number, page: number } & StockroomModel) {
    cacheClear['updateStockroomsList'].clear();
    this.stockroomFacade.updatePage(event.rows, event.page - 1);
    this.stockroomFacade.updateStockroomsList(
      {
        ...event,
        pageNumber: this.stockroomFacade.stockroomStore.state$().pageNumber$(),
        pageSize: this.stockroomFacade.stockroomStore.state$().pageSize$()
      });
  }
}
