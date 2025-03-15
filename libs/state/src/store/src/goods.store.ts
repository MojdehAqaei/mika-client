import { Store } from '../store';
import { goodsInitialState, GoodsState } from '../../state';
import { Signal } from '@angular/core';
import { GoodsModel } from '@domain/lib/base-data';
import { Crud } from "@view/lib/data-types";

export class GoodsStore {
  #store = new Store<GoodsState>(goodsInitialState);
  public readonly state$: Signal<GoodsState> = this.#store.state$.asReadonly();

  updateGoodsTable(goodsTableData: GoodsModel[]) {
    this.#store.updateField('goodsList$', goodsTableData);
  }

  updateSelectedGoods(goods: GoodsModel) {
    this.#store.updateField('selectedGoods$', goods);;
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
