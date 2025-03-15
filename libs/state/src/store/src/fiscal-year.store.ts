import { Injectable, Signal } from '@angular/core';
import { FiscalYearModel } from '@domain/lib/stockroom'
import { Store } from '../store';
import { fiscalYearInitialState, FiscalYearState } from '../../state';
import { Crud } from "@view/lib/data-types";


@Injectable()
export class FiscalYearStore {
  #store = new Store<FiscalYearState>(fiscalYearInitialState);

  public readonly state$: Signal<FiscalYearState> = this.#store.state$.asReadonly();

  updateFiscalYears(fiscalYears: FiscalYearModel[]) {
    this.#store.updateField('fiscalYears$', fiscalYears);
  }

  updateSelectedFiscalYear(fiscalYear: FiscalYearModel) {
    this.#store.updateField('selectedFiscalYear$', fiscalYear);
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
