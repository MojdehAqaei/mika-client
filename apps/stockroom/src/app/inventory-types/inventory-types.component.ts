import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { ClAction, ClColumn, ClColumnDataType, ClConfirmation } from '@sadad/component-lib/src/models';
import { ClConfirmationService } from '@sadad/component-lib/src/services';

import { BaseComponent, CrudComponent } from '@view/lib/components';
import {
  InventoryTypeGateway,
  InventoryTypeModel,
  deleteInventoryTypeUseCaseProvider,
  getAllInventoryTypesUseCaseProvider,
  saveInventoryTypeUseCaseProvider,
  updateInventoryTypeUseCaseProvider,
  getInventoryTypeByIdUseCaseProvider, StockroomModel
} from '@domain/lib/stockroom';
import { ActionInvokeService } from '@view/lib/ui-services';
import { InventoryTypeFacade } from '@state/lib/facade';
import { InventoryTypeImplementationService } from '@api/lib/impl';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { AddInventoryTypeComponent } from '../add-inventory-type/add-inventory-type.component';
import { DataTableAction } from '@view/lib/models';

@Component({
  selector: 'stockroom-inventory-types',
  standalone: true,
  imports: [CommonModules, CrudComponent, AddInventoryTypeComponent],
  templateUrl: './inventory-types.component.html',
  providers: [
    {
      provide: InventoryTypeGateway,
      useClass: InventoryTypeImplementationService
    },
    InventoryTypeFacade,
    getAllInventoryTypesUseCaseProvider,
    getInventoryTypeByIdUseCaseProvider,
    updateInventoryTypeUseCaseProvider,
    deleteInventoryTypeUseCaseProvider,
    saveInventoryTypeUseCaseProvider
  ]
})
export class InventoryTypesComponent extends BaseComponent<InventoryTypeModel> implements OnInit {
  protected readonly inventoryTypeFacade = inject(InventoryTypeFacade);
  readonly #invokeService = inject(ActionInvokeService);
  readonly #confirmationService = inject(ClConfirmationService);

  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();
  }

  ngOnInit(): void {
    this.first$ = computed(() => this.inventoryTypeFacade.inventoryTypeStore.state$().pageNumber$() * this.inventoryTypeFacade.inventoryTypeStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.inventoryTypeFacade.inventoryTypeStore.state$().total$() > this.inventoryTypeFacade.inventoryTypeStore.state$().pageSize$());
    this.inventoryTypeFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);

    this.cols = [
      {
        colSpan: 1,
        value: ['code'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.inventory-type.code')
      },
      {
        colSpan: 1,
        value: ['title'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.inventory-type.title')
      },
      {
        colSpan: 1,
        value: ['isActive'],
        type: ClColumnDataType.BOOLEAN,
        header: this.translate.instant('stockroom.inventory-type.status')
      },
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
        command: (event) => this.deleteInventoryType(event),
        key: 'Delete'
      }
    ];
  }

  openEditDialog(event: { action: ClAction, row: InventoryTypeModel }) {
    if (event.row.id) {
      this.inventoryTypeFacade.toggleEditMode(true);
      this.inventoryTypeFacade.updateSelectedInventoryType(event.row.id);
      this.inventoryTypeFacade.toggleDialogVisibility(true);
    }
  }

  deleteInventoryType(event: { action: ClAction, row: InventoryTypeModel }) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => this.inventoryTypeFacade.deleteInventoryType(Number(event.row.id))
    })
  }

  saveOrUpdateInventoryType() {
    this.#invokeService.invokeMethod('add or update inventory type');
  }

  resetForm() {
    this.inventoryTypeFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  setEditMode() {
    this.inventoryTypeFacade.toggleEditMode(false);
    this.inventoryTypeFacade.toggleDialogVisibility(true);
  }

  filterInventoryTypes(event: InventoryTypeModel) {
    cacheClear['updateInventoryTypes'].clear();
    this.inventoryTypeFacade.updatePage(this.inventoryTypeFacade.inventoryTypeStore.state$().pageSize$(), 0);
    this.inventoryTypeFacade.updateInventoryTypes({
      ...event,
      pageNumber: 0,
      pageSize: this.inventoryTypeFacade.inventoryTypeStore.state$().pageSize$()
    });
  }

  clearFilters() {
    // this.appFacade.updateFormSubmission(false); // todo
  }

  page(event: { rows: number, first: number, page: number } & InventoryTypeModel) {
    cacheClear['updateInventoryTypes'].clear();
    this.inventoryTypeFacade.updatePage(event.rows, event.page - 1);
    this.inventoryTypeFacade.updateInventoryTypes(
      {
        ...event,
        pageNumber: this.inventoryTypeFacade.inventoryTypeStore.state$().pageNumber$(),
        pageSize: this.inventoryTypeFacade.inventoryTypeStore.state$().pageSize$()
      });
  }
}
