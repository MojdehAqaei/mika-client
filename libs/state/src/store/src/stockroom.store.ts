import { Injectable, Signal } from '@angular/core';
import { Store } from '../store';
import { stockroomInitialState, StockroomState } from '../../state';
import { Crud } from "@view/lib/data-types";


@Injectable()
export class StockroomStore {
  #store = new Store<StockroomState>(stockroomInitialState);

  public readonly state$: Signal<StockroomState> = this.#store.state$.asReadonly();

  updateStockroomsList(stockroomsList: any[]) {
    this.#store.updateField('stockroomsList$', stockroomsList);
  }

  updateSelectedStockroom(stockroom: any) {
    this.#store.updateField('selectedStockroom$', stockroom);
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
