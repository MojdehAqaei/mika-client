import { Injectable, Signal } from '@angular/core';
import { OrderItemModel, OrderModel, PurchaseInvoiceModel } from '@domain/lib/purchase-and-orders';
import { Crud } from '@view/lib/data-types';
import { SelectItem } from '@view/lib/models';
import {
  purchaseInvoiceInitialState,
  PurchaseInvoiceState,
} from '../../state';
import { Store } from '../store';

@Injectable()
export class PurchaseInvoiceStore {
  #store = new Store<PurchaseInvoiceState>(purchaseInvoiceInitialState);

  public readonly state$: Signal<PurchaseInvoiceState> =
    this.#store.state$.asReadonly();

  updatePurchaseInvoiceList(purchaseInvoiceList: PurchaseInvoiceModel[]) {
    this.#store.updateField('purchaseInvoiceList$', purchaseInvoiceList);
  }

  updateDialogVisibility(visible: boolean) {
    this.#store.updateField('dialogVisible$', visible);
  }

  updateDialogLoading(lazyLoading: boolean) {
    this.#store.updateField('dialogLoading$', lazyLoading);
  }

  updateOrderItemsPerOrderId(orderItemList: SelectItem<OrderItemModel>[]) {
    this.#store.updateField('orderItemsPerOrderId$', orderItemList);
  }

  updateEditMode(editMode: boolean) {
    this.#store.updateField('editMode$', editMode);
  }

  updateSelectedPurchaseInvoice(purchaseInvoice: PurchaseInvoiceModel) {
    this.#store.updateField('selectedPurchaseInvoice$', purchaseInvoice);
  }

  updatePageNumber(number: number) {
    this.#store.updateField('pageNumber$', number);
  }

  updateOrderListPerInvoice(orders: SelectItem<OrderModel>[]) {
    this.#store.updateField('orderList$', orders);
  }

  updatePageSize(size: number) {
    this.#store.updateField('pageSize$', size);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.#store.updateField('allowedActions$', actions);
  }

  updateTotal(total: number) {
    this.#store.updateField('total$', total);
  }

  updateSearchFilterLabels(labels: string[]) {
    this.#store.updateField('searchFilterLabels$', labels);
  }
}
