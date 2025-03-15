import { Injectable, Signal } from '@angular/core';
import { InvoiceReturnModel } from '@domain/lib/purchase-and-orders';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { InvoiceReturnInitialState, InvoiceReturnState } from '@state/lib/state';
import { Crud } from '@view/lib/data-types';
import { Store } from '../store';

@Injectable()
export class InvoiceReturnStore {
  #store = new Store<InvoiceReturnState>(InvoiceReturnInitialState);

  public readonly state$: Signal<InvoiceReturnState> =
    this.#store.state$.asReadonly();

  updateInvoiceReturnList(invoiceReturnList: InvoiceReturnModel[]) {
    this.#store.updateField('invoiceReturnList$', invoiceReturnList);
  }

  updateDialogVisibility(visible: boolean) {
    this.#store.updateField('dialogVisible$', visible);
  }

  updateDialogLoading(lazyLoading: boolean) {
    this.#store.updateField('dialogLoading$', lazyLoading);
  }

  updatePurchaseInvoiceItems(orderItemList: ClSelectItem[]) {
    this.#store.updateField('purchaseInvoiceItems$', orderItemList);
  }

  updateEditMode(editMode: boolean) {
    this.#store.updateField('editMode$', editMode);
  }

  updateSelectedInvoiceReturn(invoiceReturn: InvoiceReturnModel) {
    this.#store.updateField('selectedInvoiceReturn$', invoiceReturn);
  }

  updatePageNumber(number: number) {
    this.#store.updateField('pageNumber$', number);
  }

  updatePurchaseInvoiceList(orders: ClSelectItem[]) {
    this.#store.updateField('PurchaseInvoiceList$', orders);
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
