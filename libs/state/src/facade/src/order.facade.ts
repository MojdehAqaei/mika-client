import { inject, Injectable } from '@angular/core';
import {
  ChangeOrderStateUseCase,
  DeleteOrderUseCase,
  GetOrderListUseCase,
  orderFilterDataMapper,
  OrderItemModel,
  OrderModel,
  OrderModelFilter,
  SaveOrderUseCase,
  UpdateOrderUseCase
} from '@domain/lib/purchase-and-orders';
import { Cache } from '@sadad/component-lib/src/decorators';
import { Crud } from '@view/lib/data-types';
import { ArrayHelperService } from '@view/lib/ui-services';
import { OrderStore } from '../../store';


@Injectable()
export class OrderFacade {
  public readonly orderStore = inject(OrderStore);


  readonly #getOrderListUseCase = inject(GetOrderListUseCase);
  readonly #deleteOrderUseCase = inject(DeleteOrderUseCase);
  readonly #changeOrderStateUseCase = inject(ChangeOrderStateUseCase);
  readonly #saveOrderUseCase = inject(SaveOrderUseCase);
  readonly #updateOrderUseCase = inject(UpdateOrderUseCase);


  constructor() {
    this.orderStore.updatePageNumber(0);
  }

  toggleEditMode(editMode: boolean) {
    this.orderStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.orderStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.orderStore.updatePageSize(pageSize);
    this.orderStore.updatePageNumber(pageNumber);
  }

  updateSelectedOrder(order: OrderModel) {
    this.orderStore.updateSelectedOrder(order);
  }

  updateItemsOfSelectedOrder(orderItem: OrderItemModel, mode: 'add' | 'remove') {
    const selectedOrder = this.orderStore.state$().selectedOrder$();
    let orderItems = selectedOrder?.orderItems;

    if (mode == 'add') {
      orderItems = ArrayHelperService.filterOutDuplicatedItemsByKey((orderItems || []).concat(orderItem), 'applicantOrganizationId');

    } else if (mode == 'remove') {
      const index = orderItems?.findIndex(i => i.goodsId == orderItem.goodsId);
      if (index != undefined && index > -1) {
        orderItems?.splice(index, 1);
      }
    }

    selectedOrder.orderItems = [...orderItems || []];
    this.orderStore.updateSelectedOrder(selectedOrder);
  }

  updateSelectedOrderItem(item: OrderItemModel) {
    this.orderStore.updateSelectedOrderItem(item);
  }

  @Cache()
  updateOrderList(filters: OrderModel) {
    this.#getOrderListUseCase.execute(filters).subscribe((data: OrderModel[]) => {
      this.orderStore.updateOrderList(data);
      data?.length && data[0].totalElements ? this.orderStore.updateTotal(data[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as OrderModelFilter] != undefined && orderFilterDataMapper.has(each as OrderModelFilter)) {
          tmp.push(orderFilterDataMapper.get(each as OrderModelFilter) || '');
        }
      })
      this.orderStore.updateSearchFilterLabels(tmp);
    });
  }

  savedOrder(order: OrderModel) {
    this.orderStore.updateDialogLoading(true);
    this.#saveOrderUseCase.execute(order).subscribe({
      next: (res) => {
        // adding the new order to the list
        const total = this.orderStore.state$().total$();
        const list = this.orderStore.state$().orderList$();
        list.push(res);
        this.orderStore.updateOrderList([...list]);

        this.orderStore.updateDialogLoading(false);
        this.orderStore.updateTotal(total + 1);
      },
      error: () => {
        this.orderStore.updateDialogLoading(false);
      }
    });
  }

  updatedOrder(order: OrderModel) {
    this.orderStore.updateDialogLoading(true);
    this.#updateOrderUseCase.execute(order).subscribe({
      next: (res) => {
        // updating the selected order in the list
        const list = this.orderStore.state$().orderList$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.orderStore.updateOrderList([...list]);

        this.orderStore.updateDialogLoading(false);
      },
      error: () => {
        this.orderStore.updateDialogLoading(false);
      }
    })
  }

  deletedOrder(id: number) {
    this.#deleteOrderUseCase.execute(id).subscribe(() => {
      // removing the deleted order from the list
      const total = this.orderStore.state$().total$();
      const list = this.orderStore.state$().orderList$();
      const index = list.findIndex(i => i.id == id);
      list.splice(index, 1);
      this.orderStore.updateOrderList([...list]);
      this.orderStore.updateTotal(total - 1);
    })
  }

  updateOrderState(params: OrderModel) {
    this.#changeOrderStateUseCase.execute(params).subscribe(res => {
      const list = this.orderStore.state$().orderList$();
      const index = list.findIndex(i => i.id == res.id);
      list.splice(index, 1, res);
      this.orderStore.updateOrderList([...list]);
      this.orderStore.updateSelectedOrder(res);
    });
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.orderStore.updateAllowedActions(actions);
  }

  saveOrderItems(params: OrderItemModel[]) {
    // this.orderStore.updateDialogLoading(true);
    //   this.#saveOrderItemListUseCase.execute(params).subscribe(res => {
    //     const order = this.orderStore.state$().selectedOrder$();
    //     order.orderItems = res;
    //     this.orderStore.updateDialogLoading(false);
    // });
  }

  updateOrderItems(params: OrderItemModel[]) {
    // this.orderStore.updateDialogLoading(true);
    //   this.#updateOrderItemListUseCase.execute(params).subscribe(res => {
    //   this.orderStore.updateDialogLoading(false);
    // });
  }

}
