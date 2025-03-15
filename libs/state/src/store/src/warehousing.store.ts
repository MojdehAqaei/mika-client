import { Injectable, Signal } from '@angular/core';
import { Store } from '../store';
import { warehousingInitialState, WarehousingState } from '../../state';
import { WarehousingItemModel, WarehousingModel } from '@domain/lib/stockroom';
import { Crud } from "@view/lib/data-types";



@Injectable()
export class WarehousingStore {
  #store = new Store<WarehousingState>(warehousingInitialState);

  public readonly state$: Signal<WarehousingState> = this.#store.state$.asReadonly();


  updateWarehousingList(list: WarehousingModel[]) {
    this.#store.updateField('warehousingList$', list);
  }

  updateSelectedWarehousing(warehousing: WarehousingModel) {
    this.#store.updateField('selectedWarehousing$', warehousing);
  }

  updateWarehousingItems(list: WarehousingItemModel[]) {
    this.#store.updateField('warehousingItems$', list);
  }

  updateEditMode(editMode: boolean) {
    this.#store.updateField('editMode$', editMode);
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
