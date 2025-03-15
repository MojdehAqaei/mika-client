import { Injectable, Signal } from '@angular/core';
import { Store } from '../store';
import { inventoryTypeInitialState, InventoryTypeState } from '../../state';
import { InventoryTypeModel } from '@domain/lib/stockroom';
import { Crud } from "@view/lib/data-types";

@Injectable()
export class InventoryTypeStore {
  #store = new Store<InventoryTypeState>(inventoryTypeInitialState);

  public readonly state$: Signal<InventoryTypeState> = this.#store.state$.asReadonly();

  updateInventoryTypes(inventoryTypes: InventoryTypeModel[]) {
    this.#store.updateField('inventoryTypes$', inventoryTypes);
  }

  updateSelectedInventoryType(inventoryType: InventoryTypeModel) {
    this.#store.updateField('selectedInventoryType$', inventoryType);
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
