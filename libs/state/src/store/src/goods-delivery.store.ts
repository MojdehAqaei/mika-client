import { Injectable, Signal } from '@angular/core';
import { Store } from '../store';
import { goodsDeliveryInitialState, GoodsDeliveryState } from '../../state';
import { GoodsDeliveryModel } from '@domain/lib/purchase-and-orders';
import { Crud } from "@view/lib/data-types";
import { SelectItem } from '@view/lib/models';



@Injectable()
export class GoodsDeliveryStore {
  #store = new Store<GoodsDeliveryState>(goodsDeliveryInitialState);

  public readonly state$: Signal<GoodsDeliveryState> = this.#store.state$.asReadonly();


  updateGoodsDeliveryList(goodsDeliveryList: GoodsDeliveryModel[]) {
    this.#store.updateField('goodsDeliveryList$', goodsDeliveryList);
  }

  updateSelectedGoodsDelivery(goodsDelivery: GoodsDeliveryModel) {
    this.#store.updateField('selectedGoodsDelivery$', goodsDelivery);
  }

  updateInformaticsSerialNumbers(serialList: SelectItem[]) {
    this.#store.updateField('informaticsSerialNumbers$', serialList);
  }

  updateFormStepValidity(isValid: boolean) {
    this.#store.updateField('isFormStepValid$', isValid);
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
