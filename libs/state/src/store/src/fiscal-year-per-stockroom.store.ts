import { Injectable, Signal } from '@angular/core';
import { FiscalYearPerStockroomModel } from '@domain/lib/stockroom'
import { Store } from '../store';
import { FiscalYearPerStockroomState, fiscalYearPerStockroomStateInitialState } from '../../state';
import { Crud } from "@view/lib/data-types";

@Injectable()
export class FiscalYearPerStockroomStore {
  #store = new Store<FiscalYearPerStockroomState>(fiscalYearPerStockroomStateInitialState);

  public readonly state$: Signal<FiscalYearPerStockroomState> = this.#store.state$.asReadonly();

  updateFiscalYearPerStockroomList(fiscalYearPerStockrooms: FiscalYearPerStockroomModel[]) {
    this.#store.updateField('fiscalYearPerStockroomList$', fiscalYearPerStockrooms);
  }

  updateSelectedFiscalYearPerStockroom(fiscalYearPerStockroom: FiscalYearPerStockroomModel) {
    this.#store.updateField('selectedFiscalYearPerStockroom$', fiscalYearPerStockroom);
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
