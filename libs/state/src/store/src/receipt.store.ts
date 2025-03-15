import { Store } from '../store';
import { ReceiptState, receiptInitialState } from '../../state';
import { Signal } from '@angular/core';
import { TransferAndReceiptModel } from '@domain/lib/stockroom';
import { Crud } from "@view/lib/data-types";

export class ReceiptStore {
  #store = new Store<ReceiptState>(receiptInitialState);
  public readonly state$: Signal<ReceiptState> = this.#store.state$.asReadonly();

  updateReceiptsTable(receipts: TransferAndReceiptModel[]) {
    this.#store.updateField('receipts$', receipts);
  }

  updateSelectedReceipt(receipt: TransferAndReceiptModel) {
    this.#store.updateField('selectedReceipt$', receipt);
  }

  updateDialogLoading(lazyLoading: boolean) {
    this.#store.updateField('dialogLoading$', lazyLoading);
  }

  updateDialogVisibility(visible: boolean) {
    this.#store.updateField('dialogVisible$', visible);
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
