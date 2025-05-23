import { Component, computed, effect, Inject, inject, OnInit, signal, untracked, ViewEncapsulation, WritableSignal } from '@angular/core';
import { AttachmentImplementationService, OrderImplementationService, PriceEstimateImplementationService } from '@api/lib/impl';
import { AttachmentGateway, getAllFilesUseCaseProvider, getFileUseCaseProvider } from '@domain/lib/document-management';
import {
  changeOrderStateUseCaseProvider,
  deleteOrderUseCaseProvider,
  getOrderListUseCaseProvider,
  getPriceEstimateByIdUseCaseProvider,
  OrderGateway,
  OrderModel,
  orderStateDataMapper,
  OrderStateEnum,
  orderTypeDataMapper,
  PriceEstimateGateway,
  saveOrderUseCaseProvider,
  savePriceEstimateUseCaseProvider,
  supplyMethodDataMapper,
  SupplyMethodEnum,
  updateOrderUseCaseProvider,
  updatePriceEstimateUseCaseProvider
} from '@domain/lib/purchase-and-orders';
import { cacheClear, ErrorLogger } from '@sadad/component-lib/src/decorators';
import { ClAction, ClColumn, ClColumnDataType, ClConfirmation, ClTableData } from '@sadad/component-lib/src/models';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { AttachmentFacade, OrderFacade, PriceEstimateFacade } from '@state/lib/facade';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import { Crud } from '@view/lib/data-types';
import { DataTableAction } from '@view/lib/models';
import { ActionInvokeService } from '@view/lib/ui-services';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { AddEditOrderComponent } from '../add-edit-order/add-edit-order.component';
import { OrderItemListComponent } from '../order-item-list/order-item-list.component';
import { PriceEstimateComponent } from "../price-estimate/price-estimate.component";

@Component({
  selector: 'purchase-order',
  standalone: true,
  imports: [CommonModules, CrudComponent, AddEditOrderComponent, OrderItemListComponent, PriceEstimateComponent],
  providers: [
    { provide: OrderGateway, useClass: OrderImplementationService },
    { provide: PriceEstimateGateway, useClass: PriceEstimateImplementationService },
    { provide: AttachmentGateway, useClass: AttachmentImplementationService },
    AttachmentFacade,
    PriceEstimateFacade,
    OrderFacade,
    getFileUseCaseProvider,
    getOrderListUseCaseProvider,
    deleteOrderUseCaseProvider,
    changeOrderStateUseCaseProvider,
    saveOrderUseCaseProvider,
    updateOrderUseCaseProvider,
    updatePriceEstimateUseCaseProvider,
    savePriceEstimateUseCaseProvider,
    getPriceEstimateByIdUseCaseProvider,
    getAllFilesUseCaseProvider
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})

export class OrderComponent extends BaseComponent<OrderModel> implements OnInit {
  protected readonly orderFacade = inject(OrderFacade);
  readonly #confirmationService = inject(ClConfirmationService);
  readonly #invokeService = inject(ActionInvokeService);

  contentDialogActiveIndex = 0;
  cols!: ClColumn[];
  actions?: DataTableAction[];

  actionsType: WritableSignal<Crud> = signal<Crud>('Create');
  actionTitle: WritableSignal<string> = signal<string>('');

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();

    effect(() => {
      const activeFiscalPeriod = this.appFacade.appStore.state$().activeFiscalPeriod$();
      untracked(() => {
        if (activeFiscalPeriod?.id) {
          cacheClear['updateOrderList'].clear();
          this.orderFacade.updateOrderList({});
        }
      });
    });
  }

  ngOnInit() {
    this.first$ = computed(() => this.orderFacade.orderStore.state$().pageNumber$() * this.orderFacade.orderStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.orderFacade.orderStore.state$().total$() > this.orderFacade.orderStore.state$().pageSize$());
    this.orderFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);

    this.cols = [
      {
        colSpan: 1,
        value: ['autoGeneratedCode'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('purchase-and-orders.order.code')
      },
      {
        colSpan: 1,
        value: ['datePersian'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('purchase-and-orders.order.date')
      },
      {
        colSpan: 1,
        value: ['orderType'],
        valueMapper: [orderTypeDataMapper],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('purchase-and-orders.order.type')
      },
      {
        colSpan: 1,
        value: ['supplyMethod'],
        valueMapper: [supplyMethodDataMapper],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('purchase-and-orders.order.supply-method')
      },
      {
        colSpan: 1,
        value: ['agent.name', 'agent.lName'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('purchase-and-orders.order.agent')
      },
      {
        colSpan: 1,
        value: ['state'],
        valueMapper: [orderStateDataMapper],
        cellConfig: [
          { key: "state", value: OrderStateEnum.INITIAL_SUBMIT, styleClass: "order-state initial-submit" },
          { key: "state", value: OrderStateEnum.WAIT_FOR_DELIVERY, styleClass: "order-state wait-for-delivery" },
          { key: "state", value: OrderStateEnum.WAIT_FOR_FEE_ESTIMATION, styleClass: "order-state wait_for_fee_estimation" },
          { key: "state", value: OrderStateEnum.WAIT_FOR_BUDGET_ACCEPTANCE, styleClass: "order-state wait_for_budget_acceptance" },
          { key: "state", value: OrderStateEnum.WAIT_FOR_BUY, styleClass: "order-state wait_for_buy" },
          { key: "state", value: OrderStateEnum.FINISH_ORDER, styleClass: "order-state finish_order" },
          { key: "state", value: OrderStateEnum.CANCEL_ORDER, styleClass: "order-state cancel_order" },
        ],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('status')
      }
    ];

    this.actions = [
      {
        label: this.translate.instant('edit'),
        icon: 'edit',
        index: 0,
        styleClasses: 'blue-text text-darken-2',
        status: {
          status: false,
          on: [
            { rowField: 'state', rowValue: [OrderStateEnum.INITIAL_SUBMIT] }
          ]
        },
        command: (event) => this.openEditDialog(event, 'Update'),
        key: 'Update'
      },
      {
        label: this.translate.instant('delete'),
        icon: 'delete',
        index: 1,
        styleClasses: 'red-text text-darken-2',
        status: {
          status: false,
          on: [
            { rowField: 'state', rowValue: [OrderStateEnum.INITIAL_SUBMIT] }
          ]
        },
        command: (event) => this.deleteOrder(event),
        key: 'Delete'
      },
      {
        label: this.translate.instant('finalize-submit'),
        icon: 'send',
        index: 2,
        styleClasses: 'amber-text text-darken-2',
        status: {
          status: false,
          on: [
            { rowField: 'state', rowValue: [OrderStateEnum.INITIAL_SUBMIT] }
          ]
        },
        command: (event) => this.confirmOrderStateChange(event, (event.row as OrderModel).supplyMethod == SupplyMethodEnum.BUY ? OrderStateEnum.WAIT_FOR_FEE_ESTIMATION : OrderStateEnum.WAIT_FOR_DELIVERY),
        key: 'Finalize'
      },
      {
        label: this.translate.instant('purchase-and-orders.order.completed'),
        icon: 'orders',
        index: 3,
        styleClasses: 'blue-grey-text text-darken-2',
        status: {
          status: false,
          on: [
            { rowField: 'state', rowValue: [OrderStateEnum.WAIT_FOR_DELIVERY, OrderStateEnum.WAIT_FOR_BUY] },
            // { rowField: 'supplyMethod', rowValue: [SupplyMethodEnum.DELIVER_FROM_INVENTORY] }
          ]
        },
        command: (event) => this.confirmOrderStateChange(event, OrderStateEnum.FINISH_ORDER),
        key: 'OrderComplete'
      },
      {
        label: this.translate.instant('purchase-and-orders.order.price-estimation-confirmation'),
        icon: 'price_check',
        index: 4,
        styleClasses: 'orange-text text-darken-2',
        status: {
          status: false,
          on: [
            { rowField: 'state', rowValue: [OrderStateEnum.WAIT_FOR_FEE_ESTIMATION] }
          ]
        },
        command: (event) => this.confirmOrderStateChange(event, OrderStateEnum.WAIT_FOR_BUDGET_ACCEPTANCE),
        key: 'PriceEstimateConfirmation'
      },
      {
        label: this.translate.instant('purchase-and-orders.order.budget-confirmation'),
        icon: 'savings',
        index: 5,
        styleClasses: 'amber-text text-darken-2',
        status: {
          status: false,
          on: [
            { rowField: 'state', rowValue: [OrderStateEnum.WAIT_FOR_BUDGET_ACCEPTANCE] }
          ]
        },
        command: (event) => this.confirmOrderStateChange(event, OrderStateEnum.WAIT_FOR_BUY),
        key: 'BudgetConfirmation'
      },
      {
        label: this.translate.instant('purchase-and-orders.order.add-price-estimation'),
        icon: 'payments',
        index: 6,
        styleClasses: 'purple-text text-darken-2',
        status: {
          status: false,
          on: [
            { rowField: 'state', rowValue: [OrderStateEnum.WAIT_FOR_FEE_ESTIMATION] }
          ]
        },
        command: (event) => this.openEditDialog(event, 'PriceEstimate'),
        key: 'PriceEstimate'
      },
      {
        label: this.translate.instant('cancel'),
        icon: 'cancel',
        index: 7,
        styleClasses: 'red-text text-darken-2',
        status: {
          status: false,
          on: [
            {
              rowField: 'state', rowValue: [
                OrderStateEnum.INITIAL_SUBMIT,
                OrderStateEnum.WAIT_FOR_DELIVERY,
                OrderStateEnum.WAIT_FOR_FEE_ESTIMATION,
                OrderStateEnum.WAIT_FOR_BUDGET_ACCEPTANCE,
                OrderStateEnum.WAIT_FOR_BUY
              ]
            }
          ]
        },
        command: (event) => this.confirmOrderStateChange(event, OrderStateEnum.CANCEL_ORDER),
        key: 'Cancel'
      }
    ];

  }

  @ErrorLogger()
  saveOrUpdatePriceEstimate() {
    this.#invokeService.invokeMethod('add or update price estimate');
  }

  confirmOrderStateChange(event: { action: DataTableAction, row: OrderModel }, nextState: OrderStateEnum) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.sure-to-change-state', { value: this.translate.instant('purchase-and-orders.order.') }),
      accept: () => this.orderFacade.updateOrderState(
        {
          ...event.row,
          nextState: nextState
        })
    });
  }

  openEditDialog(event: { action: ClAction, row: OrderModel }, action: Crud) {
    this.actionsType.set(action);
    this.actionTitle.set(action == 'Update' ? this.translate.instant('purchase-and-orders.order.edit') : this.translate.instant('purchase-and-orders.order.price-estimation'));
    this.contentDialogActiveIndex = 0;
    this.orderFacade.toggleEditMode(true);
    this.orderFacade.updateSelectedOrder(event.row);
    this.orderFacade.toggleDialogVisibility(true);
  }

  setEditMode() {
    this.contentDialogActiveIndex = 0;
    this.actionsType.set('Create');
    this.actionTitle.set(this.translate.instant('purchase-and-orders.order.add'));
    this.orderFacade.updateSelectedOrder({});
    this.orderFacade.toggleEditMode(false);
    this.orderFacade.toggleDialogVisibility(true);
  }

  resetForm() {
    this.orderFacade.toggleDialogVisibility(false);
    this.formGroup?.markAsUntouched();
  }

  filterOrders(event: OrderModel) {
    this.orderFacade.updatePage(this.orderFacade.orderStore.state$().pageSize$(), 0);
    cacheClear['updateOrderList'].clear();
    this.orderFacade.updateOrderList(
      {
        ...event,
        pageNumber: this.orderFacade.orderStore.state$().pageNumber$(),
        pageSize: this.orderFacade.orderStore.state$().pageSize$()
      });
  }

  clearFilters() {
    cacheClear['updateOrderList'].clear();
    this.formGroup?.markAsUntouched();
  }

  page(event: { rows: number, first: number, page: number } & OrderModel) {
    cacheClear['updateOrderList'].clear();
    this.orderFacade.updatePage(event.rows, event.page - 1);
    this.orderFacade.updateOrderList(
      {
        ...event,
        pageNumber: this.orderFacade.orderStore.state$().pageNumber$(),
        pageSize: this.orderFacade.orderStore.state$().pageSize$()
      });
  }

  getOrdersList(item: ClTableData) {
    const row = item?.data as OrderModel;
    this.orderFacade.updateSelectedOrder(row);
  }

  deleteOrder(event: { action: ClAction, row: OrderModel }) {
    this.actionsType.set('Delete');
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.wannaDelete'),
      accept: () => event.row.id ? this.orderFacade.deletedOrder(event.row.id) : ''
    });
  }
}
