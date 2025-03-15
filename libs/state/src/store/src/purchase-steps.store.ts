import { Injectable, Signal } from '@angular/core';
import { OrderModel, PurchaseStepsModel } from '@domain/lib/purchase-and-orders';
import { Crud } from '@view/lib/data-types';
import { SelectItem } from '@view/lib/models';
import {
  purchaseStepsInitialState,
  PurchaseStepsState,
} from '../../state';
import { Store } from '../store';

@Injectable()
export class PurchaseStepsStore {
  #store = new Store<PurchaseStepsState>(purchaseStepsInitialState);

  public readonly state$: Signal<PurchaseStepsState> =
    this.#store.state$.asReadonly();

  updatePurchaseStepsList(purchaseStepsList: PurchaseStepsModel[]) {
    this.#store.updateField('purchaseStepsList$', purchaseStepsList);
  }

  updateDialogVisibility(visible: boolean) {
    this.#store.updateField('dialogVisible$', visible);
  }

  updateDialogLoading(lazyLoading: boolean) {
    this.#store.updateField('dialogLoading$', lazyLoading);
  }

  updateEditMode(editMode: boolean) {
    this.#store.updateField('editMode$', editMode);
  }

  updateSelectedPurchaseSteps(purchaseSteps: PurchaseStepsModel) {
    this.#store.updateField('selectedPurchaseSteps$', purchaseSteps);
  }

  updatePageNumber(number: number) {
    this.#store.updateField('pageNumber$', number);
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

  updateOrderList(orders: SelectItem<OrderModel>[]) {
    this.#store.updateField('orderList$', orders);
  }

  updatePurchaseStepTypeList(items: SelectItem[]) {
    this.#store.updateField('purchaseStepTypeList$', items);
  }
}
