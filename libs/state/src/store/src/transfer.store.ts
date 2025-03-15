import { Store } from '../store';
import { TransferState, transferInitialState } from '../../state';
import { Signal } from '@angular/core';
import { TransferAndReceiptModel } from '@domain/lib/stockroom';
import { Crud } from "@view/lib/data-types";

export class TransferStore {
  #store = new Store<TransferState>(transferInitialState);
  public readonly state$: Signal<TransferState> = this.#store.state$.asReadonly();

  updateTransferTable(transfers: TransferAndReceiptModel[]) {
    this.#store.updateField('transfers$', transfers);
  }

  updateSelectedTransfer(transfer: TransferAndReceiptModel) {
    this.#store.updateField('selectedTransfer$', transfer);
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
