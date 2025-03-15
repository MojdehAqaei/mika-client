import { Injectable, Signal } from '@angular/core';
import { Store } from '../store';
import { orderInitialState, OrderState } from '../../state';
import { OrderModel, OrderItemModel } from '@domain/lib/purchase-and-orders';
import { Crud } from "@view/lib/data-types";



@Injectable()
export class OrderStore {
  #store = new Store<OrderState>(orderInitialState);

  public readonly state$: Signal<OrderState> = this.#store.state$.asReadonly();


  updateOrderList(orderList: OrderModel[]) {
    this.#store.updateField('orderList$', orderList);
  }

  updateSelectedOrder(order: OrderModel) {
    this.#store.updateField('selectedOrder$', order);
  }

  updateSelectedOrderItem(item: OrderItemModel) {
    this.#store.updateField('selectedOrderItem$', item);
  }

  updateDialogLoading(lazyLoading: boolean) {
    this.#store.updateField('dialogLoading$', lazyLoading);
  }

  updateDialogVisibility(visible: boolean) {
    this.#store.updateField('dialogVisible$', visible);
  }

  updateEditMode(editMode: boolean) {
    this.#store.updateField('editMode$', editMode);
  }

  updatePageSize(size: number) {
    this.#store.updateField('pageSize$', size);
  }

  updatePageNumber(number: number) {
    this.#store.updateField('pageNumber$', number);
  }

  updateTotal(total: number) {
    this.#store.updateField('total$', total);;
  }

  updateSearchFilterLabels(labels: string[]) {
    this.#store.updateField('searchFilterLabels$', labels);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.#store.updateField('allowedActions$', actions);
  }
}
